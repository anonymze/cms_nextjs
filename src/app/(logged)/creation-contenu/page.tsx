import { CardContentManager } from "@/components/ui/Card/CardContent";

export default async function Page() {
	return (
		<div className="flex flex-col gap-y-6 justify-center items-center">
			<CardContentManager redirect="/creation-contenu/article" title="Créer un article" />
			<CardContentManager redirect="/creation-contenu/page" title="Créer une page" />
		</div>
	);
}
