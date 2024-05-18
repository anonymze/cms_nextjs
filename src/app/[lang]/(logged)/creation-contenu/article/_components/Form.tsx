"use client";
import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formCreateArticleSchema, type ArticleI18n } from "@/types/article";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createArticleQuery, updateArticleQuery } from "@/api/queries/articleQueries";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/form/Input";
import { I18n } from "@/types/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useRef, type FormEvent, useState, type SyntheticEvent } from "react";
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
import { createMediaDetailsQuery, updateMediaDetailsQuery } from "@/api/queries/mediaDetailsQueries";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { SpinnerLoader } from "@/components/ui/loader/Loader";
import { updateMediaDetailsSchema } from "@/types/media_details";
import { ProgressLink } from "@/components/ui/progress-bar/ProgressBar";
import type { z } from "zod";

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
	const queryClient = useQueryClient();
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

	const createArticleMutation = useMutation({
		mutationFn: createArticleQuery,
		mutationKey: ["articles"],
		meta: {
			action: "create",
			message: i18n[langContext]("ARTICLE_ADDED"),
		},
	});

	const updateArticleMutation = useMutation({
		mutationFn: updateArticleQuery,
		mutationKey: ["article", { slug: article?.uuid }],
		meta: {
			action: "update",
			message: i18n[langContext]("ARTICLE_EDITED"),
		},
	});

	const createMediaDetailsMutation = useMutation({
		mutationFn: createMediaDetailsQuery,
		mutationKey: ["media-details"],
		meta: {
			action: "create",
			message: i18n[langContext]("MEDIA_DETAILS_ADDED"),
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["article", { slug: article?.uuid }] }),
	});

	const updateMediaDetailsMutation = useMutation({
		mutationFn: updateMediaDetailsQuery,
		mutationKey: ["media-details"],
		meta: {
			action: "update",
			message: i18n[langContext]("MEDIA_DETAILS_EDITED"),
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["article", { slug: article?.uuid }] }),
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
			// "2024-03-30T21:51:00.000Z" is datetime, so remove the milliseconds
			eventCreatedAt: article?.eventCreatedAt ? article.eventCreatedAt.split(".")[0] : "",
			eventFinishedAt: article?.eventFinishedAt ? article.eventFinishedAt.split(".")[0] : "",
			tag: article?.tag || "",
			lang: langForm,
		},
	});

	// values are typesafe
	const createOrUpdateArticle = async (values: z.infer<typeof formCreateArticleSchema>) => {
		// if an article is present then we just update it
		if (article) return updateArticleMutation.mutate({ ...values, uuid: article.uuid });

		const articleCreated = await createArticleMutation.mutateAsync(values);

		// if article is created then we redirect to the form with the uuid (to be in an updating state)
		if (articleCreated) {
			router.push(
				`/${langContext}/creation-contenu/article/${articleCreated.uuid}${langParam ? `?lang=${langParam}` : ""}`,
			);
		}
	};

	const createMediaDetails = (ev: FormEvent<HTMLFormElement>) => {
		if ((ev.nativeEvent as SubmitEvent)?.submitter?.dataset.type === "cancel" || !files.length) return;
		if (!article || !langForm) return toast.info(i18n[langContext]("CREATE_CONTENT_FIRST"));

		createMediaDetailsMutation.mutate({
			entityAttached: "article",
			entityUuid: article.uuid,
			lang: langForm,
			// ids are uuids in this case
			mediaUuids: files.map((file) => file.id),
		});

		return;
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(createOrUpdateArticle)} className="space-y-6">
					<div className="flex gap-x-4">
						{/* EVENT CREATED AT */}
						<FormField
							control={form.control}
							name="eventCreatedAt"
							render={({ field }) => (
								<FormItem className="basis-full">
									<FormLabel>{i18n[langContext]("EVENT_BEGINNING")}</FormLabel>
									<FormControl>
										{/* @ts-expect-error we fix the string / undefined problem in defaultValue, don't know why error still occur here */}
										<Input placeholder="" {...field} type="datetime-local" />
									</FormControl>
									<FormDescription>{i18n[langContext]("EVENT_BEGINNING_ARTICLE")}</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* EVENT FINISHED AT */}
						<FormField
							control={form.control}
							name="eventFinishedAt"
							render={({ field }) => (
								<FormItem className="basis-full">
									<FormLabel>{i18n[langContext]("EVENT_END")}</FormLabel>
									<FormControl>
										{/* @ts-expect-error */}
										<Input placeholder="" {...field} type="datetime-local" />
									</FormControl>
									<FormDescription>{i18n[langContext]("EVENT_END_ARTICLE")}</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

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

					{/* MEDIAs */}
					{articleI18n?.media_details.length ? (
						<div>
							<p className="mb-2 text-sm font-medium">{i18n[langContext]("MEDIA_ASSOCIATED")}</p>
							<div className="flex flex-wrap items-center gap-3 p-4 border border-dashed rounded-md">
								{articleI18n.media_details.map((mediaDetail) => (
									<MediaOperation
										mutationKey={["article", { slug: article?.uuid }]}
										removeMediaFromApi
										mediaDetailsUuid={mediaDetail.uuid}
										key={mediaDetail.uuid}
										editionMedia
										afterSubmit={(ev: SyntheticEvent) => {
											const inputs = Array.from(ev.currentTarget.closest('dialog')?.querySelectorAll('input') || []);
											
											const notSafeData = new Map();

											for (const input of inputs) {
												notSafeData.set(input.name, input.value);
											}

											const safeData = updateMediaDetailsSchema.safeParse(Object.fromEntries(notSafeData));
											
											if (!safeData.success) return;

											updateMediaDetailsMutation.mutate({
												uuid: mediaDetail.uuid,
												...safeData.data,
											});
										}}
									>
										<Image
											placeholder="blur"
											blurDataURL={"/placeholder-150x150.jpg"}
											width={300}
											height={300}
											priority={false}
											src={mediaDetail.media.filepath_public}
											alt=""
										/>
									</MediaOperation>
								))}
								{createMediaDetailsMutation.isPending && <SpinnerLoader className="mx-8" medium/>}
							</div>
						</div>
					) : null}
					{!articleI18n?.media_details.length && createMediaDetailsMutation.isPending && <SpinnerLoader medium/>}

					<Button
						disabled={!article}
						onClick={() => dialogRef.current?.show()}
						aria-label={!article ? i18n[langContext]("CREATE_CONTENT_FIRST") : undefined}
					>
						<PlusCircleIcon className="h-4 w-4 mr-2" /> {i18n[langContext]("ADD_MULTIPLE_MEDIA")}
					</Button>

					{!article ? (
						<Popover>
							<PopoverTrigger><InfoIcon className="h-5 w-5 ml-3" /></PopoverTrigger>
							<PopoverContent>{i18n[langContext]("CREATE_CONTENT_FIRST")}</PopoverContent>
						</Popover>
					) : null}

					{/* TAG */}
					<FormField
						control={form.control}
						name="tag"
						render={({ field }) => (
							<FormItem className="w-1/2">
								<FormLabel>{i18n[langContext]("TAG")}</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormDescription>{i18n[langContext]("TAG_DEFINITION")}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField control={form.control} name="lang" render={({ field }) => <input type="hidden" {...field} />} />

					<p className="pt-5 text-xs">* {i18n[langContext]("MANDATORY_FIELDS")}</p>

					<Button disabled={createArticleMutation.isPending} isLoading={createArticleMutation.isPending} type="submit">
						{i18n[langContext]("SAVE")}
					</Button>
				</form>
			</Form>

			<Dialog
				ref={dialogRef}
				onSubmitForm={createMediaDetails}
				onClose={async () => {
					await sleep(250);
					setFiles([]);
				}}
			>
				<DialogHeader title={i18n[langContext]("SELECT_MEDIA")} />
				<DialogBody>
					<div className="flex flex-wrap gap-3 min-h-48">
						{media?.map((file) => (
							<MediaOperation mediaUuid={file.uuid} selectMedia key={file.uuid}>
								<Image
									placeholder="blur"
									blurDataURL={"/placeholder-150x150.jpg"}
									width={150}
									height={150}
									priority={false}
									src={file.filepath_public}
									alt=""
								/>
							</MediaOperation>
						))}
						{media?.length === 0 && (
							<>
								<p className="my-auto ml-auto">{i18n[langContext]("NO_MEDIA_DATA")}.</p>
								<ProgressLink href={`/${langContext}/media`} className="btn my-auto mr-auto underline">
									{i18n[langContext]("MEDIA_LIBRARY")}
								</ProgressLink>
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
