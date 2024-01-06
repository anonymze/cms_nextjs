import type { User } from "@prisma/client";
import { api } from "../_config";

export async function getUsersQuery() {
  const result = await api.get<Omit<User, "id">[]>("users");
  return result.data;
}

export async function verifyUserQuery(email: User["email"]) {
  const result = await api.get(`users/verify/${email}`);
  return result.data;
}

export async function createUserQuery(user: Omit<User, "uuid" | "id" | "createdAt">) {
  const result = await api.post("users", user);
  return result.data;
}

export async function deleteUserQuery(userId: User["uuid"]) {
  const result = await api.delete(`users/${userId}`);
  return result.data;
}

export async function updateUserQuery(userId: User["uuid"]) {
  const result = await api.patch(`users/${userId}`);
  return result.data;
}
