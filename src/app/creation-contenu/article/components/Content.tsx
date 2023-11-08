"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/Form/form";
import { Textarea } from "@/components/ui/Form/textarea";
import { formCreateArticleSchema } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

interface Props {}

const Content: React.FC<Props> = () => {
  const form = useForm<z.infer<typeof formCreateArticleSchema>>({
    resolver: zodResolver(formCreateArticleSchema),
    // default values is needed if controller used
    defaultValues: {
      title: "",
      content: "",
      description: "",
      conclusion: "",
    },
  });

  // values is typesafe
  function onSubmit(values: z.infer<typeof formCreateArticleSchema>) {
    console.log(values);
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
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Le titre de votre article</FormDescription>
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
              <FormLabel>Contenu</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Le contenu de votre article</FormDescription>
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

        <Button type="submit">Enregistrer</Button>
      </form>
    </Form>
  );
};

export default Content;
