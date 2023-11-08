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
} from "@/components/Form/form";
import { Textarea } from "@/components/Form/textarea";
import { formCreatePageSchema } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

interface Props {}

const Content: React.FC<Props> = () => {
  const form = useForm<z.infer<typeof formCreatePageSchema>>({
    resolver: zodResolver(formCreatePageSchema),
    // default values is needed if controller used
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
    },
  });

  // values is typesafe
  function onSubmit(values: z.infer<typeof formCreatePageSchema>) {
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

export default Content;
