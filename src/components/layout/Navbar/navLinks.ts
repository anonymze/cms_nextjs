import { i18n } from "@/i18n/translations";
import { Smile } from "lucide-react";
import type { I18n } from "@/types/i18n";

export const mainNavigation = (lang: I18n) =>
	[
		{ name: i18n[lang]("CONTENT"), href: "/contenu", icon: Smile, count: "5", current: false },
		{
			name: "Gestion des contenus",
			href: "/creation-contenu",
			icon: Smile,
			count: "5",
			current: false,
		},
		{ name: i18n[lang]("MEDIA_LIBRARY"), href: "/media", icon: Smile, count: "5", current: false },
	] satisfies Array<{
		name: string;
		href: string;
		icon: any;
		count: string;
		current: boolean;
	}>;

export const optionsNavigation = (lang: I18n) => [
	{
		id: 1,
		name: i18n[lang]("USER_MANAGEMENT"),
		href: "/gestion-utilisateur",
		initial: "H",
		current: false,
	},
	{ id: 2, name: i18n[lang]("CONFIGURATION"), href: "/configuration", initial: "T", current: false },
] satisfies Array<{
	id: number;
	name: string;
	href: string;
	initial: string;
	current: boolean;
}>;
