"use client";
import { useThemeStore } from "./contexts/StoreUIContext"

import { type PropsWithChildren } from "react"

import '@/styles/globals.css'

export default function App({ children }: PropsWithChildren) {
    const theme = useThemeStore((state) => state.theme);
    
    return (
        <html lang="fr" className={theme}>
            {children}
        </html>
    )
}