"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { useFormStatus } from "react-dom";
import type { StateConfigurationGithubForm } from "../Content";
import { useContext } from "react";
import { LangContext } from "@/utils/providers";
import { i18n } from "@/i18n/translations";

export default function GithubForm({ state }: { state: StateConfigurationGithubForm }) {
	const lang = useContext(LangContext);
	const { pending } = useFormStatus();

	return (
		<div className="mt-2">
			<div className="mb-5">
				<Label htmlFor="clientId">{i18n[lang]("PUBLIC_CLIENT")} ID</Label>
				<Input required className="mt-2" type="text" id="clientId" name="clientId" defaultValue={state.clientId} />
			</div>
			<div className="mb-5">
				<Label htmlFor="clientSecret">{i18n[lang]("SECRET_CLIENT")}</Label>
				<Input
					required
					className="mt-2"
					type="text"
					id="clientSecret"
					name="clientSecret"
					defaultValue={state.clientSecret}
				/>
			</div>
			<Button type="submit" disabled={pending}>
				{i18n[lang]("SAVE")}
			</Button>
		</div>
	);
}
