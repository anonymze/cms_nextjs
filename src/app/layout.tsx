import App from '@/App'
import { Inter } from 'next/font/google'

const fontSans = Inter(
  { 
    subsets: ['latin'],
  }
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      // it seems i have to pass the font in the props, because there is a difference between ssr and client classname
      <App fontSans={fontSans}>
        {children}
      </App>
  )
}
