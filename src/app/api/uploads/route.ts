import { cookies } from 'next/headers'
 
export async function GET(request: Request) {
  return Response.json('GET UPLOADS !!!!');
}

export async function POST(request: Request) {
  return Response.json('POST UPLOADS !!!!');
}

