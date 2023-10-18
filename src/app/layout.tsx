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
      <App fontSans={fontSans}>
        {children}
      </App>
  )
}
