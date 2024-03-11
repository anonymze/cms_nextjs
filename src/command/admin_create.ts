import { PrismaClient } from "@prisma/client";
import { ENV_SERVER } from "../env/server";
import { clerkClient } from "@clerk/nextjs";

// we just trigger the import to parse the envs
ENV_SERVER;

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
	await new PrismaClient().user.create({
		data: {
			email: mail,
			name: "admin",
		},
	});

	// we get the clerk user or create it
	const usersClerk = await clerkClient.users.getUserList({
		emailAddress: [mail],
	});

	typeof usersClerk[0] !== "undefined"
		? usersClerk[0]
		: await clerkClient.users.createUser({
				emailAddress: [mail],
				firstName: "admin",
				// generate random password (we don't care, it just needs to be strong)
				password: line,
		  });
	break;
}

process.stdout.write("\x1b[32mAdmin created !\n\x1b[0m");
process.exit(0);
