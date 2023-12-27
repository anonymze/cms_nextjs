import type { NextRequest } from "next/server";

const OAUTH_SERVICES = ['github', 'google', 'apple'] as const;

export async function GET(req: NextRequest) {
  const service = req.nextUrl.pathname.split('/').at(-1);

  // @ts-ignore, i don't know how to do...
  if (!service || !OAUTH_SERVICES.includes(service)) {
    return new Response('Service OAUTH not handled');
  }

  const oAuthService = new OAuthService(service as typeof OAUTH_SERVICES[number]);

  return new Response('oui');

  // Use the code to get the access token and the state to prevent CSRF attacks
}

class OAuthService {
  constructor(protected _serviceName: typeof OAUTH_SERVICES[number]) {}

  get serviceName() {
    return this._serviceName;
  }
}

