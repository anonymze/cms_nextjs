import Footer from "./Footer"
import Menu from "./Menu"

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="grid grid-rows-6 gap-4">
        <aside className="container col-span-1 bg-gray-900">
            <Menu />
        </aside>
        <main className="container col-span-5">
            {children}
        </main>
        <footer className="container col-span-6">
            <Footer />
        </footer>
    </div>
  )
}

export default Layout