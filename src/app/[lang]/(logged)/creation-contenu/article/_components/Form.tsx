"use client";

import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formCreateArticleSchema } from "@/types/article";
import { useMutation } from "@tanstack/react-query";
import { createArticleQuery, updateArticleQuery } from "@/api/queries/articleQueries";
import dynamic from "next/dynamic";
import { SkeletonCard } from "@/components/ui/skeleton/Skeleton";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	Form,
} from "@/components/ui/form/Form";
import { Textarea } from "@/components/ui/form/Textarea";
import { Input } from "@/components/ui/form/Input";
import { I18n } from "@/types/i18n";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";
import type { ArticleI18ns } from "@/types/article";
import type { z } from "zod";

interface Props {
	langForm?: I18n;
	article?: ArticleI18ns;
}

// we import component dynamicly (when we need it only, not included in the bundle) because the component uses a big package
const TiptapDynamic = dynamic(() => import("@/components/rich-text/Tiptap"), {
	loading: () => (
		<>
			<SkeletonCard animated height="2.2rem" />
			<SkeletonCard animated height="9rem" />
		</>
	),
});

const FormArticle: React.FC<Props> = ({ article, langForm = I18n.DEFAULT }) => {
	const lang = useContext(LangContext);
	const router = useRouter();

	const createMutation = useMutation({
		mutationFn: createArticleQuery,
		mutationKey: ["articles"],
		meta: {
			action: "create",
			message: i18n[lang]("ARTICLE_ADDED"),
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateArticleQuery,
		mutationKey: ["article", { slug: article?.uuid }],
		meta: {
			action: "update",
			message: i18n[lang]("ARTICLE_EDITED"),
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
		// if uuid is present then we update the entity
		if (article?.uuid) return updateMutation.mutate({ ...values, uuid: article.uuid });

		const articleCreated = await createMutation.mutateAsync(values);

		// if article is created then we redirect to the form with the uuid (to be in an updating state)
		if (articleCreated) router.push(`/creation-contenu/article/${articleCreated.uuid}`);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(createOrUpdateArticle)} className="space-y-6">
				{/* TITLE */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{i18n[lang]("TITLE")} *</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormDescription>{i18n[lang]("TITLE_ARTICLE")}</FormDescription>
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
							<FormLabel>{i18n[lang]("DESCRIPTION")}</FormLabel>
							<FormControl>
								<Textarea placeholder="" {...field} />
							</FormControl>
							<FormDescription>{i18n[lang]("DESCRIPTION_ARTICLE")}</FormDescription>
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
							<FormLabel>{i18n[lang]("CONTENT")} *</FormLabel>
							<FormControl>
								<TiptapDynamic description={field.value} onChange={field.onChange} />
							</FormControl>
							<FormDescription>{i18n[lang]("CONTENT_ARTICLE")}</FormDescription>
							{/* TODO need to be fixed */}
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
							<FormLabel>{i18n[lang]("CONCLUSION")}</FormLabel>
							<FormControl>
								<Textarea placeholder="" {...field} />
							</FormControl>
							<FormDescription>{i18n[lang]("CONCLUSION_ARTICLE")}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lang"
					render={({ field }) => <input type="hidden" {...field} />}
				/>

				<p className="pt-5 text-xs">* {i18n[lang]("MANDATORY_FIELDS")}</p>

				<Button
					disabled={createMutation.isPending}
					isLoading={createMutation.isPending}
					type="submit"
				>
					{i18n[lang]("SAVE")}
				</Button>
			</form>
		</Form>
	);
};

export default FormArticle;
