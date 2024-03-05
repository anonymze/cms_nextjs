import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My little CMS",
};

export default async function Layout({children}) {
	return (
		children
	);
}
