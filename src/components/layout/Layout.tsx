import Footer from "./Footer"
import SideNavbar from "./Navbar/SideNavbar"
import TopNavbar from "./Navbar/TopNavbar"

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="grid grid-cols-12 grid-rows-12 h-full">
        <aside className="container col-span-3 row-span-12 bg-gray-900 xl:col-span-2">
            <SideNavbar />
        </aside>
        <main className="container col-span-9 row-span-11 py-8 overflow-y-scroll xl:col-span-10">
            <TopNavbar />
            {children}
        </main>
        <footer className="container col-span-9 row-span-1 xl:col-span-10">
            <Footer />
        </footer>
    </div>
  )
}

export default Layout