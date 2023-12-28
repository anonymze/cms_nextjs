"use client";
import { Button } from "@/components/ui/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { formCreateArticleSchema } from "@/types/article";
import { useMutation } from "@tanstack/react-query";
import { createArticleQuery } from "@/api/queries/articleQueries";
import dynamic from "next/dynamic";
import { SkeletonCard } from "@/components/ui/Skeleton/Skeleton";
import type { z } from "zod";
import type { Article } from "@/types/article";
import type { Language } from "@/utils/language";
import { SpinnerLoader } from "@/components/ui/Loader/Loader";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/Form/Form";
import { Textarea } from "@/components/ui/Form/Textarea";
import { Input } from "@/components/ui/Form/Input";

interface Props {
  lang: (typeof Language)[number];
  uuid?: Article["uuid"];
}

// we import component dynamicly (when we need it only, not included in the bundle) because the component uses a big package
const TiptapDynamic = dynamic(() => import("@/components/RichText/Tiptap"), {
  loading: () => (
    <>
      <SkeletonCard animated height="2.2rem" />
      <SkeletonCard animated height="9rem" />
    </>
  ),
});

// TODO dunno yet but i have to do a correct translation system
const FormArticle: React.FC<Props> = ({ lang, uuid }) => {
  const createMutation = useMutation({ mutationFn: createArticleQuery });

  const form = useForm<z.infer<typeof formCreateArticleSchema>>({
    resolver: zodResolver(formCreateArticleSchema),
    mode: "onSubmit",
    // default values is needed if controller used
    defaultValues: {
      title: "",
      content: "<p></p>",
      description: "",
      conclusion: "",
    },
  });

  // values are typesafe
  async function onSubmit(values: z.infer<typeof formCreateArticleSchema>) {
    createMutation.mutate(values);
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
                <TiptapDynamic description={field.name} onChange={field.onChange} />
              </FormControl>
              <FormDescription>Le contenu de l&apos;article</FormDescription>
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

        <p className="text-xs">* champs obligatoires</p>

        <Button disabled={createMutation.isPending} type="submit">
          {createMutation.isPending && <SpinnerLoader />}
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};

export default FormArticle;
