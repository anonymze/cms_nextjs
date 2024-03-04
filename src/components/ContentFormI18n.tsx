"use client";

import React, { useContext } from "react";
import Flags from "@/components/ui/Flags";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { cn } from "@/utils/libs/tailwind/helper";
import { I18n } from "@/types/i18n";
import { i18n } from "@/i18n/translations";
import { getKeysTypedObject } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { LangContext } from "@/utils/providers";
import { useRouter } from "next/navigation";

type ChildComponentProps = { langForm: I18n };
type ChildComponentType = React.FunctionComponent<ChildComponentProps>;

type ContentProps = {
	children:
		| React.ReactElement<ChildComponentProps, ChildComponentType>
		| React.ReactElement<ChildComponentProps, ChildComponentType>[];
};

export function ContentFormI18n({ children }: ContentProps) {
	const router = useRouter();
	const langContext = useContext(LangContext);
	const langParam = useSearchParams().get("lang");

	return (
		<Tabs defaultValue={langParam && Object.values(I18n).includes(langParam as I18n) ? langParam : langContext}>
			<TabsList className="h-10 p-1 w-fit mb-8 rounded-md bg-muted text-muted-foreground">
				{getKeysTypedObject(i18n).map((lang) => (
					<React.Fragment key={lang}>
						<TabsTrigger
							className={cn(
								"inline-flex items-center justify-center",
								"min-w-[3.6rem] px-3 py-1.5",
								"whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
								"disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background",
								"data-[state=active]:text-foreground data-[state=active]:shadow-sm",
							)}
							value={lang}
							onClick={() => router.push(`?lang=${lang}`)}
						>
							<Flags flag={lang} />
						</TabsTrigger>
					</React.Fragment>
				))}
			</TabsList>
			{getKeysTypedObject(i18n).map((lang) => (
				<React.Fragment key={lang}>
					<TabsContent value={lang}>
						{React.Children.map(children, (child) => {
							if (React.isValidElement(child)) {
								return React.cloneElement(child, {
									langForm: lang,
								});
							}
							throw new Error("ContentFormI18n children must be a valid React element");
						})}
					</TabsContent>
				</React.Fragment>
			))}
		</Tabs>
	);
}
