"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { cn } from "@/utils/libs/tailwind/helper";
import { RotateCwIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { i18n } from "@/i18n/translations";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";
import type { StateConfigurationApiForm } from "../Content";

export default function ApiForm({ state }: { state: StateConfigurationApiForm }) {
	const lang = useContext(LangContext);
	const { pending } = useFormStatus();

	return (
		<>
			<Label htmlFor="apiKey">{i18n[lang]("KEY")} API</Label>
			<div className="flex items-center gap-x-2 mt-2">
				<Input type="text" id="apiKey" name="apiKey" defaultValue={state.apiKey} />
				<Button type="submit" disabled={pending}>
					<RotateCwIcon
						className={cn("flex-shrink-0 w-4 h-4 mr-2", pending && "animate-spin")}
					/>
					{i18n[lang]("GENERATE")}
				</Button>
			</div>
		</>
	);
}
