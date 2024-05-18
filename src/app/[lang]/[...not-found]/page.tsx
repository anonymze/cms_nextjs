"use client";;
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/libs/tailwind/helper";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { i18n } from "@/i18n/translations";
import { ProgressLink } from "@/components/ui/progress-bar/ProgressBar";
import type { PageParamsI18n } from "@/types/i18n";

export default function Page({ params: { lang } }: PageParamsI18n) {
  const router = useRouter();
  return (
      <div className="flex flex-col min-h-screen">
        <header className="p-8">
          <Button onClick={() => router.back()}>
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            <AlertCircleIcon className="block w-12 h-12 mx-auto text-gray-400" />
            404
          </h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            {i18n[lang]("PAGE_NOT_EXIST")}
          </p>
          <div className="mt-6">
            <ProgressLink
              className={cn(
                "inline-flex items-center justify-center rounded-md",
                "font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50 shadow",
                "px-6 py-4 text-base",
                "bg-primary text-primary-foreground hover:bg-muted-foreground"
              )}
              href={`/${lang}/dashboard`}
            >
              {i18n[lang]("RETURN_HOME")}
            </ProgressLink>
          </div>
        </main>
        <footer className="h-14 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Anonnymze | Yann.
        </footer>
      </div>
  );
}
