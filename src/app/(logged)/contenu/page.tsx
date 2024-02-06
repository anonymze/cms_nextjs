import { CardContentManager } from "@/components/ui/Card";

export default async function Page() {
	return (
		<div className="flex flex-col gap-y-6 justify-center items-center">
			<CardContentManager redirect="/contenu/articles" title="Voir les articles" />
			<CardContentManager redirect="/contenu/pages" title="Voir les pages" />
		</div>
	);
}