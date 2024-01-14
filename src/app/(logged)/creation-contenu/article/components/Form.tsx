"use client";
import { Button } from "@/components/ui/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formCreateArticleSchema } from "@/types/article";
import { useMutation } from "@tanstack/react-query";
import { createArticleQuery } from "@/api/queries/articleQueries";
import dynamic from "next/dynamic";
import { SkeletonCard } from "@/components/ui/Skeleton/Skeleton";
import { SpinnerLoader } from "@/components/ui/Loader/Loader";
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
import type { Article } from "@prisma/client";

interface Props {
  lang: string;
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

const FormArticle: React.FC<Props> = ({ lang, uuid }) => {
  const createMutation = useMutation({
    mutationFn: createArticleQuery,
    mutationKey: ["articles"],
    meta: {
      action: "create",
      message: "Article créé",
    },
  });

  const form = useForm<z.infer<typeof formCreateArticleSchema>>({
    resolver: zodResolver(formCreateArticleSchema),
    mode: "onSubmit",
    // default values is needed if controller used
    defaultValues: {
      title: "",
      // because we use tiptap, we need to pass an empty paragraph to the editor
      content: "<p></p>",
      description: "",
      conclusion: "",
      lang,
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

        <FormField
          control={form.control}
          name="lang"
          render={({ field }) => <input type="hidden" {...field} />}
        />

        <p className="pt-5 text-xs">* champs obligatoires</p>

        <Button disabled={createMutation.isPending} isLoading={createMutation.isPending} type="submit">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};

export default FormArticle;
