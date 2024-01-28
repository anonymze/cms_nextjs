"use client";
import { Button } from "@/components/ui/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formCreatePageSchema, type PageI18ns } from "@/types/page";
import { useMutation } from "@tanstack/react-query";
import { createPageQuery, updatePageQuery } from "@/api/queries/pageQueries";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	Form,
} from "@/components/ui/Form/Form";
import { Textarea } from "@/components/ui/Form/Textarea";
import { Input } from "@/components/ui/Form/Input";
import type { z } from "zod";
import type { I18n } from "@/types/i18n";
import { useRouter } from "next/navigation";

interface Props {
	langForm?: I18n;
	page?: PageI18ns;
}

const FormPage: React.FC<Props> = ({ langForm, page }) => {
	const router = useRouter();

	const createMutation = useMutation({
		mutationFn: createPageQuery,
		mutationKey: ["pages"],
		meta: {
			action: "create",
			message: "Page créée",
		},
	});

	const updateMutation = useMutation({
		mutationFn: updatePageQuery,
		mutationKey: ["page", { slug: page?.uuid }],
		meta: {
			action: "update",
			message: "Page modifiée",
		},
	});

	const pageI18n = page?.i18n?.find((pageI18n) => pageI18n.lang === langForm);

	const form = useForm<z.infer<typeof formCreatePageSchema>>({
		resolver: zodResolver(formCreatePageSchema),
		mode: "onSubmit",
		// default values is needed if controller used
		defaultValues: {
			title: pageI18n?.title || "",
			subtitle: pageI18n?.subtitle || "",
			description: pageI18n?.description || "",
			lang: langForm,
		},
	});

	// values are typesafe
	async function onSubmit(values: z.infer<typeof formCreatePageSchema>) {
		// if uuid is present then we update the entity
		if (page?.uuid) return updateMutation.mutate({ ...values, uuid: page.uuid });

		const pageCreated = await createMutation.mutateAsync(values);

		// if page is created then we redirect to the form with the uuid (to be in an updating state)
		if (pageCreated) router.push(`/creation-contenu/page/${pageCreated.uuid}`);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
							<FormDescription>Le titre de la page</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* SUBTITLE */}
				<FormField
					control={form.control}
					name="subtitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sous-titre</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormDescription>Le sous-titre de la page</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* DESCRIPTION */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description *</FormLabel>
							<FormControl>
								<Textarea placeholder="" {...field} />
							</FormControl>
							<FormDescription>Une brève description de la page</FormDescription>
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

export default FormPage;
