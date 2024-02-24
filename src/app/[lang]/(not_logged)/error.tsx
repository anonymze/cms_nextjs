"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/Button";
import { i18n } from "@/i18n/translations";
import { I18n } from "@/types/i18n";
import { useEffect } from "react";

export default function ErrorNext({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>{i18n[I18n.DEFAULT]("SOMETHING_UNEXPECTED_HAPPENED")}</h2>
			<Button
				type="button"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				{i18n[I18n.DEFAULT]("TRY_AGAIN")}
			</Button>
		</div>
	);
}
