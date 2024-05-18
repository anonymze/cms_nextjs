import type { QueryFunctionContext } from "@tanstack/react-query";
import { api } from "../_config";

export async function getConfigurationQuery() {
	const result = await api.get('configuration');
	return result.data;
}