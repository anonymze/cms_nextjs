import App from "@/App";
import Layout from "@/components/layout/Layout";
import { Inter } from "next/font/google";
import { cn } from "@/utils/libs/tailwind/helper";
import { Providers } from "@/utils/providers";
import { Toaster } from "@/components/ui/toaster/Sonner";
import type { PropsWithChildren } from "react";
import type { PageParamsI18n } from "@/types/i18n";

const fontSans = Inter({
	subsets: ["latin"],
	// prevent mismatch id with ssr
	preload: false,
});

export default function RootLayout({ children, params: { lang } }: PropsWithChildren & PageParamsI18n) {
	return (
		<App lang={lang}>
			<body className={cn("h-dvh", fontSans.className)}>
				<Providers lang={lang}>
					<Layout>
						{children}
					</Layout>
				</Providers>
				<Toaster duration={4000} />
			</body>
		</App>
	);
}
