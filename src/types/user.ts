import { z } from "zod";

// source of truths for roles
export enum UserRole {
	ADMIN = "ADMIN",
	USER = "USER",
	GUEST = "GUEST",
}

// less score has more rights
export const HierarchyRole = {
	ADMIN: 0,
	USER: 1,
	GUEST: 2,
} as const;

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
