"use client";

import React from "react";
import { Language } from "@/utils/language";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import FormArticle from "./Form";
import { cn } from "@/utils/libs/shadcn";
import dynamic from "next/dynamic";

// we import component dynamicly (when we need it only, not included in the bundle) because the component uses a big package
const DynamicIcon = dynamic(() => import("@/components/ui/IconDynamic"), {
  loading: () => <span>...</span>,
});

const Content: React.FC = () => {
  return (
    <Tabs defaultValue={Language[0]}>
      <TabsList className="h-10 p-1 w-fit mb-8 rounded-md bg-muted text-muted-foreground">
        {Language.map((lang) => (
          <React.Fragment key={lang + "1"}>
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
              <DynamicIcon name="Heading" size={20} />
            </TabsTrigger>
          </React.Fragment>
        ))}
      </TabsList>
      {Language.map((lang) => (
        <React.Fragment key={lang + "2"}>
          <TabsContent value={lang}>
            <FormArticle lang={lang} />
          </TabsContent>
        </React.Fragment>
      ))}
    </Tabs>
  );
};

export default Content;
