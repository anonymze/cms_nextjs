"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/Form/Input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/Form/Form";
import { Textarea } from "@/components/Form/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formCreateArticleSchema, type Article } from "@/types/article";
import type { Language } from "@/utils/language";
import Tiptap from "@/components/RichText/Tiptap";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createArticleQuery } from "@/api/articleQueries";
import { useToast } from "@/hooks/use_toast";

interface Props {
  lang:  typeof Language[number];
  uuid?: Article["uuid"];
}

// TODO dunno yet but i have to do a correct translation system
const FormArticle: React.FC<Props> = ({ lang, uuid }) => {
  console.log(lang, uuid);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: createArticleQuery,
  });

  const form = useForm<z.infer<typeof formCreateArticleSchema>>({
    resolver: zodResolver(formCreateArticleSchema),
    mode: "onChange",
    // default values is needed if controller used
    defaultValues: {
      title: "",
      content: "",
      description: "",
      conclusion: "",
    },
  });

  // values is typesafe
  async function onSubmit(values: z.infer<typeof formCreateArticleSchema>) {
    await mutation.mutateAsync(values);
    toast({
      title: "Article créé",
      variant: "success",
      duration: 2500,
    })
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
                <Tiptap description={field.name} onChange={field.onChange} />
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

        <Button disabled={mutation.isPending} type="submit">
          {mutation.isPending ? (
            <svg
              className="animate-spin mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            ""
          )}
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};

export default FormArticle;
