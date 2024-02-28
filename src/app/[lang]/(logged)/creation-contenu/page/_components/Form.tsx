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
} from "@/components/ui/form/Form";
import { Textarea } from "@/components/ui/form/Textarea";
import { Input } from "@/components/ui/form/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { i18n } from "@/i18n/translations";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";
import type { z } from "zod";
import type { I18n } from "@/types/i18n";

interface Props {
	langForm?: I18n;
	page?: PageI18ns;
}

const FormPage: React.FC<Props> = ({ langForm, page }) => {
	const langContext = useContext(LangContext);
	const langParam = useSearchParams().get("lang");
	const router = useRouter();

	const createMutation = useMutation({
		mutationFn: createPageQuery,
		mutationKey: ["pages"],
		meta: {
			action: "create",
			message: i18n[langContext]("PAGE_ADDED"),
		},
	});

	const updateMutation = useMutation({
		mutationFn: updatePageQuery,
		mutationKey: ["page", { slug: page?.uuid }],
		meta: {
			action: "update",
			message: i18n[langContext]("PAGE_EDITED"),
		},
	});

	const pageI18n = page?.i18n?.find((pageI18n) => pageI18n.lang === langForm);

	console.log({langForm});

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
	async function createOrUpdatePage(values: z.infer<typeof formCreatePageSchema>) {
		// if uuid is present then we update the entity
		if (page?.uuid) return updateMutation.mutate({ ...values, uuid: page.uuid });

		const pageCreated = await createMutation.mutateAsync(values);

		// if page is created then we redirect to the form with the uuid (to be in an updating state)

		if (pageCreated) router.push(`/creation-contenu/page/${pageCreated.uuid}${langParam ? `?lang=${langParam}` : ""}`);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(createOrUpdatePage)} className="space-y-6">
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
							<FormDescription>{i18n[langContext]("TITLE_PAGE")}</FormDescription>
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
							<FormLabel>{i18n[langContext]("SUBTITLE")}</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormDescription>{i18n[langContext]("SUBTITLE_PAGE")}</FormDescription>
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
							<FormLabel>{i18n[langContext]("DESCRIPTION")} *</FormLabel>
							<FormControl>
								<Textarea placeholder="" {...field} />
							</FormControl>
							<FormDescription>{i18n[langContext]("DESCRIPTION_PAGE")}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lang"
					render={({ field }) => <input type="hidden" {...field} />}
				/>

				<p className="pt-5 text-xs">* {i18n[langContext]("MANDATORY_FIELDS")}</p>

				<Button
					disabled={createMutation.isPending}
					isLoading={createMutation.isPending}
					type="submit"
				>
					{i18n[langContext]("SAVE")}
				</Button>
			</form>
		</Form>
	);
};

export default FormPage;
