import { api } from "../_config";
import type { User } from "@prisma/client";
import type { UserCreationZodType, UserUpdateZodType } from "@/types/user";
import type { QueryFunctionContext } from "@tanstack/react-query";

export async function getUsersQuery({ queryKey }: QueryFunctionContext) {
  const searchParams = new URLSearchParams();
  const [, params] = queryKey;

  if (params?.page) searchParams.set("page", params.page);

  const result = await api.get<Omit<User, "id">[]>(`users?${searchParams.toString()}`);
  return result.data;
}

export async function verifyUserQuery(email: User["email"]) {
  const result = await api.get<unknown>(`users/verify/${email}`);
  return result.data;
}

export async function createUserQuery(user: UserCreationZodType) {
  const result = await api.post("users", user);
  return result.data;
}

export async function deleteUserQuery(userId: User["uuid"]) {
  const result = await api.delete(`users/${userId}`);
  return result.data;
}

export async function updateUserQuery({
  uuid,
  ...userProperties
}: { uuid: User["uuid"] } & UserUpdateZodType) {
  const result = await api.patch(`users/${uuid}`, userProperties);
  return result.data;
}
