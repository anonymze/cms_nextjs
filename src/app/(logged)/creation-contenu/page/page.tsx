import { ContentFormI18n } from "@/components/ContentFormI18n";
import FormPage from "./components/Form";

export default async function Page() {
  return (
    <ContentFormI18n>
      <FormPage />
    </ContentFormI18n>
  );
}
