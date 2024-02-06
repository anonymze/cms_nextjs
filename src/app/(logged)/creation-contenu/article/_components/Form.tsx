"use client";

import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ArticleI18ns, formCreateArticleSchema } from "@/types/article";
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
import type { z } from "zod";
import { I18n } from "@/types/i18n";
import { useRouter } from "next/navigation";

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
	const router = useRouter();

	const createMutation = useMutation({
		mutationFn: createArticleQuery,
		mutationKey: ["articles"],
		meta: {
			action: "create",
			message: "Article créé",
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateArticleQuery,
		mutationKey: ["article", { slug: article?.uuid }],
		meta: {
			action: "update",
			message: "Article modifié",
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
							<FormLabel>Titre *</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormDescription>Le titre de l&apos;article</FormDescription>
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
							<FormLabel>Présentation</FormLabel>
							<FormControl>
								<Textarea placeholder="" {...field} />
							</FormControl>
							<FormDescription>Une brève description de l&apos;article</FormDescription>
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
							<FormLabel>Contenu *</FormLabel>
							<FormControl>
								<TiptapDynamic description={field.value} onChange={field.onChange} />
							</FormControl>
							<FormDescription>Le contenu de l&apos;article</FormDescription>
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
							<FormLabel>Conclusion</FormLabel>
							<FormControl>
								<Textarea placeholder="" {...field} />
							</FormControl>
							<FormDescription>Une brève conclusion de l&apos;article</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lang"
					render={({ field }) => <input type="hidden" {...field} />}
				/>

				<p className="pt-5 text-xs">* champs obligatoires</p>

				<Button
					disabled={createMutation.isPending}
					isLoading={createMutation.isPending}
					type="submit"
				>
					Enregistrer
				</Button>
			</form>
		</Form>
	);
};

export default FormArticle;
