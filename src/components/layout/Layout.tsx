import Footer from "./Footer";
import SideNavbar from "./navbar/SideNavbar";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className="grid grid-cols-12 grid-rows-12 h-full">
			<aside className="container col-span-3 row-span-12 bg-gray-900 xl:col-span-2">
				<SideNavbar />
			</aside>
			<main className="container col-span-9 row-span-11 py-lg overflow-y-scroll xl:col-span-10">
				{children}
			</main>
			<footer className="container col-span-9 row-span-1 xl:col-span-10">
				<Footer />
			</footer>
		</div>
	);
};

export default Layout;
