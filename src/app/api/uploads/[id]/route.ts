import { cookies } from 'next/headers'
 
export async function GET(
  req: Request,
  res: any
) {
  const test = await fetch(new URL('/api/uploads', req.url), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: '1234' }),  
  })
  return Response.json('id !!!!');
}

export async function DELETE(request: Request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token');
  
    console.log(token);
   
    return new Response('Hello, Next.js!', {
      status: 200,
      headers: { 'Set-Cookie': `token=${token?.value}` },
    })
  }
