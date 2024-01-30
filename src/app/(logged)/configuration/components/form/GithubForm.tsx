"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Input";
import { Label } from "@/components/ui/Form/Label";
import { useFormStatus } from "react-dom";
import type { StateConfigurationGithubForm } from "../Content";

export default function GithubForm({ state }: { state: StateConfigurationGithubForm }) {
	const { pending } = useFormStatus();

	return (
		<div className="mt-4">
			<div className="mb-5">
				<Label htmlFor="clientId">Client ID</Label>
				<Input required className="mt-2" type="text" id="clientId" name="clientId" defaultValue={state.clientId} />
			</div>
			<div className="mb-5">
				<Label htmlFor="clientSecret">Client Secret</Label>
				<Input required className="mt-2" type="text" id="clientSecret" name="clientSecret" defaultValue={state.clientSecret} />
			</div>
			<Button type="submit" disabled={pending}>
				Enregistrer
			</Button>
		</div>
	);
}
