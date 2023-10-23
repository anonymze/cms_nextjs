import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type TokenInfo = {
  validToken: true,
  token: string
} | {
  validToken: false,
  token: null
}
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   // on redirige / vers /dashboard
  if (request.nextUrl.pathname === '/') return NextResponse.redirect(new URL('/dashboard', request.url));

  if (request.nextUrl.pathname.startsWith('/api')) {
    const { validToken, token } = tokenInfo(request);

    // si token pas valide on redirige vers une route qui indique erreur d'autorisation
    if (!validToken) {
      return NextResponse.redirect(new URL('/401', request.url));
    }

    console.log(token);
    // TODO: vérifier que le token lié à un utilisateur est autorisé à faire cette action
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ['/', '/api/:path*'],
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