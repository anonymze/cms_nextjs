import prisma from "./single_instance";

export const DEFAULT_LIMIT_FIND_MANY = 10;

// need to type correctly this sh**
export async function findManyWithLimit(
	model: any,
	options: any,
	searchParams?: URLSearchParams,
): Promise<any[]> {
	// if we have a page provided we apply it
	let page = parseInt(searchParams?.get("page") || "1");
	if (Number.isNaN(page)) page = 1;

	return model.findMany({
		// page 1 means we skip 0 entry
		skip: (page - 1) * DEFAULT_LIMIT_FIND_MANY,
		take: DEFAULT_LIMIT_FIND_MANY,
		...options,
	});
}

export async function getUserWithEmail(email: string) {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
};

export async function getUserWithUuid(uuid: string) {
	return prisma.user.findUnique({
		where: {
			uuid,
		},
	});
};
