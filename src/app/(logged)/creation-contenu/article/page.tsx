// if not client side i don't get the props langForm... WHY ??
"use client"

import { ContentFormI18n } from "@/components/ContentFormI18n";
import FormArticle from "./components/Form";

export default function Page() {
  return (
    <ContentFormI18n>
      <FormArticle />
    </ContentFormI18n>
  );
}
