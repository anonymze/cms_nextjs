import { PrismaClient } from "@prisma/client";
import { ENV_SERVER } from "../env/server";
import { clerkClient, isClerkAPIResponseError } from "@clerk/nextjs";

// we just trigger the import to parse the envs
ENV_SERVER;
const prisma = new PrismaClient();

process.stdout.write("\x1b[33mYou will create a new admin user\n\x1b[0m");
process.stdout.write("Email: ");

let mail = "";

for await (const line of console) {
	if (!line || line === "exit") process.exit(0);
	mail = line;
	break;
}

process.stdout.write("Password: ");

for await (const line of console) {
	try {
		await clerkClient.users.createUser({
			emailAddress: [mail],
			firstName: "admin",
			password: line,
		});

		await prisma.user.create({
			data: {
				email: mail,
				name: "admin",
				isActive: true,
			},
		});
	} catch (e) {
		if (isClerkAPIResponseError(e)) {
			process.stdout.write(`\x1b[31mClerk error: ${e.errors[0]?.message}\n\x1b[0m`);
			process.exit(1);
		}

		if (e instanceof Error) {
			// Handle known Prisma error
			process.stdout.write(`\x1b[31mPrisma error: ${e.message}\n\x1b[0m`);
			process.exit(1);
		}
	}
	break;
}

process.stdout.write("\x1b[32mAdmin created !\n\x1b[0m");
process.exit(0);
