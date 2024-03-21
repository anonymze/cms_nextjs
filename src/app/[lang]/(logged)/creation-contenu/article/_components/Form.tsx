"use client";

import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formCreateArticleSchema, type ArticleI18n } from "@/types/article";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createArticleQuery, updateArticleQuery } from "@/api/queries/articleQueries";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/form/Input";
import { I18n } from "@/types/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useRef, useState, type FormEvent } from "react";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/form/Textarea";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	Form,
} from "@/components/ui/form/Form";
import { SkeletonCard } from "@/components/ui/skeleton/Skeleton";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { InfoIcon, PlusCircleIcon } from "lucide-react";
import { getMediaQuery } from "@/api/queries/mediaQueries";
import MediaOperation from "@/components/media-operation/MediaOperation";
import Image from "next/image";
import { useFilesStore } from "@/contexts/store_files_context";
import { sleep } from "@/utils/helper";
import type { z } from "zod";
import Link from "next/link";

interface Props {
	langForm?: I18n;
	article?: ArticleI18n;
}

// we import component dynamicly (when we need it only, not included in the bundle) because the component uses a big package
const TiptapDynamic = dynamic(() => import("@/components/ui/rich-text/Tiptap"), {
	loading: () => (
		<>
			<SkeletonCard animated height="2.2rem" />
			<SkeletonCard animated height="9rem" />
		</>
	),
});

const FormArticle: React.FC<Props> = ({ langForm, article }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const langContext = useContext(LangContext);
	const langParam = useSearchParams().get("lang");
	const router = useRouter();
	const files = useFilesStore((state) => state.files);
	const setFiles = useFilesStore((state) => state.setFiles);

	const { data: media } = useQuery({
		queryKey: ["media"],
		queryFn: getMediaQuery,
	});

	const createMutation = useMutation({
		mutationFn: createArticleQuery,
		mutationKey: ["articles"],
		meta: {
			action: "create",
			message: i18n[langContext]("ARTICLE_ADDED"),
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateArticleQuery,
		mutationKey: ["article", { slug: article?.uuid }],
		meta: {
			action: "update",
			message: i18n[langContext]("ARTICLE_EDITED"),
		},
	});

	const articleI18n = article?.i18n?.find((articleI18n) => articleI18n.lang === langForm);

	const form = useForm<z.infer<typeof formCreateArticleSchema>>({
		resolver: zodResolver(formCreateArticleSchema),
		mode: "onSubmit",
		// default values is needed if controller used
		defaultValues: {
			title: articleI18n?.title || "",
			// because we use tiptap, we need to pass an empty paragraph to the editor
			content: articleI18n?.content || "<p></p>",
			description: articleI18n?.description || "",
			conclusion: articleI18n?.conclusion || "",
			lang: langForm,
		},
	});

	// values are typesafe
	const createOrUpdateArticle = async (values: z.infer<typeof formCreateArticleSchema>) => {
		// if an article is present then we just update it
		if (article) return updateMutation.mutate({ ...values, uuid: article.uuid });

		const articleCreated = await createMutation.mutateAsync(values);

		// if article is created then we redirect to the form with the uuid (to be in an updating state)
		if (articleCreated)
			router.push(
				`/${langContext}/creation-contenu/article/${articleCreated.uuid}${langParam ? `?lang=${langParam}` : ""}`,
			);
	};

	const addMediaToForm = (ev: FormEvent<HTMLFormElement>) => {
		// @ts-ignore
		console.log(ev.nativeEvent);
		if ((ev.nativeEvent as SubmitEvent)?.submitter?.title === "cancel" || !files.length) return;
		if (!article || !articleI18n) return toast.info(i18n[langContext]("CREATE_CONTENT_FIRST"));

		return updateMutation.mutate({ uuid: article.uuid, ...articleI18n });
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(createOrUpdateArticle)} className="space-y-6">
					{/* TITLE */}
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{i18n[langContext]("TITLE")} *</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormDescription>{i18n[langContext]("TITLE_ARTICLE")}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* PRESENTATION */}
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{i18n[langContext]("DESCRIPTION")}</FormLabel>
								<FormControl>
									<Textarea placeholder="" {...field} />
								</FormControl>
								<FormDescription>{i18n[langContext]("DESCRIPTION_ARTICLE")}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* CONTENT */}
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{i18n[langContext]("CONTENT")} *</FormLabel>
								<FormControl>
									<TiptapDynamic description={field.value} onChange={field.onChange} />
								</FormControl>
								<FormDescription>{i18n[langContext]("CONTENT_ARTICLE")}</FormDescription>
								{/* TODO need to be translated */}
								{form.formState.isSubmitted && form.formState.errors[""] && (
									<FormMessage>{form.formState.errors[""].message}</FormMessage>
								)}
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* CONCLUSION */}
					<FormField
						control={form.control}
						name="conclusion"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{i18n[langContext]("CONCLUSION")}</FormLabel>
								<FormControl>
									<Textarea placeholder="" {...field} />
								</FormControl>
								<FormDescription>{i18n[langContext]("CONCLUSION_ARTICLE")}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div
						className="flex items-center gap-x-2"
						title={!article ? i18n[langContext]("CREATE_CONTENT_FIRST") : undefined}
					>
						<Button
							disabled={!article}
							onClick={() => dialogRef.current?.show()}
							aria-label={!article ? i18n[langContext]("CREATE_CONTENT_FIRST") : undefined}
						>
							<PlusCircleIcon className="h-4 w-4 mr-2" /> {i18n[langContext]("ADD_MULTIPLE_MEDIA")}
						</Button>
						{!article && <InfoIcon className="h-5 w-5" />}
					</div>

					<FormField control={form.control} name="lang" render={({ field }) => <input type="hidden" {...field} />} />

					<p className="pt-5 text-xs">* {i18n[langContext]("MANDATORY_FIELDS")}</p>

					<Button disabled={createMutation.isPending} isLoading={createMutation.isPending} type="submit">
						{i18n[langContext]("SAVE")}
					</Button>
				</form>
			</Form>

			<Dialog
				ref={dialogRef}
				onSubmitForm={addMediaToForm}
				onClose={async () => {
					await sleep(250);
					setFiles([]);
				}}
			>
				<DialogHeader title={i18n[langContext]("SELECT_MEDIA")} />
				<DialogBody>
					<div className="flex flex-wrap gap-3 min-h-48">
						{media?.map((file) => (
							<MediaOperation mediaUuid={file.uuid} selectMedia key={file.uuid} className="select-mode">
								<Image width={100} height={100} priority={false} src={file.filepath_public} alt="" />
							</MediaOperation>
						))}
						{media?.length === 0 && (
							<>
								<p className="my-auto ml-auto">{i18n[langContext]("NO_MEDIA_DATA")}.</p>
								<Link href={`/${langContext}/media`} className="btn my-auto mr-auto underline">
									{i18n[langContext]("MEDIA_LIBRARY")}
								</Link>
							</>
						)}
					</div>
				</DialogBody>
				<DialogFooter />
			</Dialog>
		</>
	);
};

export default FormArticle;
