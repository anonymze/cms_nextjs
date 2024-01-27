export const DEFAULT_LENGTH_FIND_MANY = 10;

// need to type correctly this sh**
export async function findManyWithDefaults(
	model: any,
	options: any,
	searchParams?: URLSearchParams,
): Promise<any[]> {
	// if we have a page provided we apply it
	let page = parseInt(searchParams?.get("page") || "1");
	if (Number.isNaN(page)) page = 1;

	return model.findMany({
		// page 1 means we skip 0 entry
		skip: (page - 1) * DEFAULT_LENGTH_FIND_MANY,
		take: DEFAULT_LENGTH_FIND_MANY,
		...options,
	});
}
