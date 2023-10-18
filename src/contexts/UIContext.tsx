"use client"

import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

type ContextUIProps = {
    theme: string,
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
} | null;

const UIContext = createContext<ContextUIProps>(null);

export const UIProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
        <UIContext.Provider
        value={{
            theme,
            setTheme
        }}
        >
            {children}
        </UIContext.Provider>
    )
}

export const useUIContext = () => {
    const context = useContext(UIContext);

    if (!context) {
        throw new Error("useUIContext must be used within a UIProvider");
    }

    return context;
}

export default UIProvider;
