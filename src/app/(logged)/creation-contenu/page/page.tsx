// if not client side i don't get the props langForm... WHY ??
"use client";

import { ContentFormI18n } from "@/components/ContentFormI18n";
import FormPage from "./_components/Form";

export default function Page() {
	return (
		<ContentFormI18n>
			<FormPage />
		</ContentFormI18n>
	);
}
