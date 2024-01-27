import { z } from "zod";

export enum UserRole {
	ADMIN = "ADMIN",
	USER = "USER",
	GUEST = "GUEST",
}

export enum LoginStateInfo {
	CREATED = "created",
	INACTIVE = "inactive",
}

export type UserCreationZodType = z.infer<typeof userCreationSchema>;
export type UserUpdateZodType = z.infer<typeof userUpdateSchema>;

export const userCreationSchema = z.object({
	clerkUserId: z.string(),
});

export const userUpdateSchema = z.object({
	isActive: z.boolean().optional(),
	name: z.string().optional(),
	role: z.nativeEnum(UserRole).optional(),
});
