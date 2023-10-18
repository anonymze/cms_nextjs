import { create } from 'zustand'

type StateTheme = {
    theme: 'light' | 'dark'
}
  
type ActionTheme = {
    setTheme: (theme: StateTheme['theme']) => void
}

export const useThemeStore = create<StateTheme & ActionTheme>()((set) => ({
  theme: 'dark',
  setTheme: (theme) => set((_) => ({ theme })),
}))
