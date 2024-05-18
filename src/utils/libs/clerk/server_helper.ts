import { clerkClient } from "@clerk/nextjs";
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { jwtDecode } from "jwt-decode";
import { getUserWithEmail } from "../prisma/server_helper";

export const CLERK_SESSION_NAME = "__session";

/**
 * @description get a current user from the cookies
 */
export const getCurrentUser = async (cookies: RequestCookies) => {
  try {
    const jwtToken = jwtDecode(cookies.get(CLERK_SESSION_NAME)?.value || "");

    if (!jwtToken.sub) return null;

    const userClerk = await clerkClient.users.getUser(jwtToken.sub);
    const email = userClerk.emailAddresses[0]?.emailAddress;

	if (!email) return null;

    return getUserWithEmail(email);
  } catch (err) {
    return null;
  }
};
