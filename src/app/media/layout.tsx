import ActionsButtons from "@/components/ActionsButtons"
import Header from "@/components/layout/Header"
import type { Metadata } from "next"

// export it and nextjs handle it
export const metadata: Metadata = {
  title: 'CMS Nextjs',
  description: 'Créé par Yann M.',
}


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <Header>
          <h1>Médiathèque</h1>
          <ActionsButtons actionPopup={{label: "Ajouter"}} />
        </Header>
        {children}
      </>
  )
}
