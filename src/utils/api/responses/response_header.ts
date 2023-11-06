export function getResponseHeader(sendCookieApiToken: boolean) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (sendCookieApiToken) {
    // 2592000 = 30 days
    headers.append(
      "set-cookie",
      `token=${process.env.API_KEY}; Max-Age=2592000; path=/api; HttpOnly; SameSite=None; Secure;`,
    );
  }

  return headers;
}
