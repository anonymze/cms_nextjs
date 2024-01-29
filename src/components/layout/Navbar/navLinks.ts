import { Smile } from "lucide-react";

export const mainNavigation = [
	{ name: "Contenu", href: "/contenu", icon: Smile, count: "5", current: false },
	{
		name: "Gestion des contenus",
		href: "/creation-contenu",
		icon: Smile,
		count: "5",
		current: false,
	},
	{ name: "Médiatheque", href: "/media", icon: Smile, count: "5", current: false },
] satisfies Array<{
	name: string;
	href: string;
	icon: any;
	count: string;
	current: boolean;
}>;

export const optionsNavigation = [
	{
		id: 1,
		name: "Gestion des utilisateurs",
		href: "/gestion-utilisateur",
		initial: "H",
		current: false,
	},
	{ id: 2, name: "Configuration", href: "/configuration", initial: "T", current: false },
] satisfies Array<{
	id: number;
	name: string;
	href: string;
	initial: string;
	current: boolean;
}>;
