"use client";
import { useThemeStore } from "./contexts/StoreUIContext"

import type { Metadata } from "next"
import { type PropsWithChildren } from "react"

import '@/styles/globals.css'

type AppProps = PropsWithChildren

// export it and nextjs handle it
export const metadata: Metadata = {
    title: 'CMS Nextjs',
    description: 'Créé par Yann M.',
}

export default function App({ children }: AppProps) {
    const theme = useThemeStore((state) => state.theme);
    
    return (
        <html lang="fr" className={theme}>
            {children}
        </html>
    )
}