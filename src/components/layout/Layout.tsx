import Footer from "./Footer"
import Navbar from "./Navbar/Navbar"

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="grid grid-rows-6 grid-cols-6 min-h-[inherit]">
        <aside className="container col-span-2 row-span-6 bg-gray-900">
            <Navbar />
        </aside>
        <main className="container col-span-4 row-span-5">
            {children}
        </main>
        <footer className="container col-span-4 row-span-1">
            <Footer />
        </footer>
    </div>
  )
}

export default Layout