import { prismaClient } from '../route';

export async function GET(
  req: Request,
  res: any
) {

  return Response.json('id !!!!');
}

export async function DELETE(req: Request) {
  // get id form url
  const uuid = req.url.split('/').at(-1);

  await prismaClient.upload.delete({
    where: { uuid },
  });
  
  return Response.json('Ok', { status: 200});
}
