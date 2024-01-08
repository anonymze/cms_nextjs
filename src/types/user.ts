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

export const userCreationSchema = z.object({
  clerkUserId: z.string(),
});