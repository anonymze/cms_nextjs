"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "./Button";

interface Props {
	actionPopup?: {
		label: string;
	};
}

export default function ActionsButtons({ actionPopup }: Props) {
	const openDialog = () => {
		document.querySelector("dialog")?.show();
	};

	return (
		<div className="flex items-center gap-3">
			{actionPopup && (
				<Button onClick={openDialog}>
					<PlusCircleIcon className="h-5 w-5 mr-1" /> {actionPopup.label}
				</Button>
			)}
		</div>
	);
}
