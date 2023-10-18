"use client"

import Layout from "./components/layout/Layout"
import { cn } from "./utils/libs/utils"
import { useThemeStore } from "./contexts/StoreUIContext"

import type { Metadata } from "next"
import type { NextFont } from "next/dist/compiled/@next/font"
import { type PropsWithChildren } from "react"

import '@/styles/globals.css'

type AppProps = PropsWithChildren & { fontSans: NextFont }

// export it and nextjs handle it
export const metadata: Metadata = {
    title: 'CMS Nextjs',
    description: 'Créé par Yann M.',
}

const App: React.FC<AppProps> = ({ children, fontSans }) => {
    const theme = useThemeStore((state) => state.theme);

    return (
        <html lang="fr" className={theme}>
            <body 
            className={cn(
                "h-screen",
                fontSans.className
            )}      
            >
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    )
}

export default App