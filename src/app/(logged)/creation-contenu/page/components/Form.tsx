"use client";
import { Button } from "@/components/ui/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { formCreatePageSchema } from "@/types/page";
import { useMutation } from "@tanstack/react-query";
import { createPageQuery } from "@/api/queries/pageQueries";
import type { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/Form/Form";
import { Textarea } from "@/components/ui/Form/Textarea";
import { Input } from "@/components/ui/Form/Input";
import type { Page } from "@prisma/client";

interface Props {
  lang: any;
  uuid?: Page["uuid"];
}

// TODO dunno yet but i have to do a correct translation system
const FormPage: React.FC<Props> = ({ lang, uuid }) => {
  console.log(lang, uuid);

  const createMutation = useMutation({
    mutationFn: createPageQuery,
  });

  const form = useForm<z.infer<typeof formCreatePageSchema>>({
    resolver: zodResolver(formCreatePageSchema),
    mode: "onSubmit",
    // default values is needed if controller used
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
    },
  });

  // values are typesafe
  async function onSubmit(values: z.infer<typeof formCreatePageSchema>) {
    // @ts-ignore
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

        <p className="text-xs">* champs obligatoires</p>

        <Button type="submit">Enregistrer</Button>
      </form>
    </Form>
  );
};

export default FormPage;
