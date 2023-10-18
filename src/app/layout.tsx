import App from '@/App'
import { Inter } from 'next/font/google'
import { cn } from '@/utils/libs/utils'
import Layout from '@/components/layout/Layout'

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
      <App>
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
      </App>
  )
}
