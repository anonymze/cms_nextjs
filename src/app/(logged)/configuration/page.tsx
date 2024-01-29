"use client";

import { useFormState } from "react-dom";
import { generateApiKey } from "./server/action";
import ContentForm from "./components/ContentForm";

export type StateConfigurationForm = {
	apiKey: string,
	error: boolean
}

const initialState: StateConfigurationForm = {
	apiKey: "",
	error: false
};

export default function Page() {
	const [state, formAction] = useFormState(generateApiKey, initialState);

	return (
		<form action={formAction}>
			<ContentForm state={state} />
		</form>
	);
}
