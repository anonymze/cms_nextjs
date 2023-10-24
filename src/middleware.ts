import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jsonResponseUnauthorized } from './utils/responses/response_post_api'

type TokenInfo = {
  validToken: true,
  token: string
} | {
  validToken: false,
  token: null
}

export const config = {
  matcher: ['/', '/api/:path*'],
}
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   // on redirige / vers /dashboard
  if (request.nextUrl.pathname === '/') return NextResponse.redirect(new URL('/dashboard', request.url));

  if (request.nextUrl.pathname.startsWith('/api')) {
    const { validToken, token } = tokenInfo(request);

    // si token pas valide on indique une 401
    if (!validToken) return jsonResponseUnauthorized;

    console.log(token);
    // TODO: vérifier que le token lié à un utilisateur est autorisé à faire cette action
  }

  // on passe le middleware de base
  return NextResponse.next();
}

const tokenInfo = (request: NextRequest): TokenInfo => {
  const tokenCookie = request.cookies.get('token')?.value;

  if (tokenCookie && tokenCookie === process.env.API_KEY){
    return { validToken: true, token: tokenCookie }
  }

  const tokenAuth = request.headers.get('authorization');

  if (tokenAuth && tokenAuth === process.env.API_KEY){
    return { validToken: true, token: tokenAuth }
  }

  return { validToken: false, token: null };
}