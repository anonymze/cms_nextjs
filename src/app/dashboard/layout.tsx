import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'CMS Nextjs',
  description: 'Créé par Yann M.',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return {children}
}
