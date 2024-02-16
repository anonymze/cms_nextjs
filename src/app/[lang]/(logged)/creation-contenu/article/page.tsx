import { ContentFormI18n } from "@/components/ContentFormI18n";
import FormArticle from "./_components/Form";

export default async function Page() {
	return (
		<ContentFormI18n>
			<FormArticle />
		</ContentFormI18n>
	);
}