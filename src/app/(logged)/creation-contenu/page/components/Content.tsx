"use client";
import { cn } from "@/utils/libs/tailwind/merge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import FormPage from "./Form";
import { I18n } from "@/types/i18n";
import { i18n } from "@/i18n/translations";
import Flags from "@/components/Flags";
import type { Page } from "@prisma/client";


// we import component dynamicly (when we need it only, not included in the bundle) because the component uses a big package
// const IconDynamic = dynamic(() => import("@/components/ui/IconDynamic"), {
//   loading: () => <span>...</span>,
// });

export default function Content({ uuid }: { uuid?: Page["uuid"] }) {
  return (
    <Tabs defaultValue={I18n.DEFAULT}>
      <TabsList className="h-10 p-1 w-fit mb-8 rounded-md bg-muted text-muted-foreground">
        {Object.keys(i18n).map((lang, idx) => (
          <React.Fragment key={idx}>
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
            >
              <Flags flag={lang} />
            </TabsTrigger>
          </React.Fragment>
        ))}
      </TabsList>
      {Object.keys(i18n).map((lang, idx) => (
        <React.Fragment key={idx}>
          <TabsContent value={lang}>
            <FormPage uuid={uuid} lang={lang} />
          </TabsContent>
        </React.Fragment>
      ))}
    </Tabs>
  );
};
