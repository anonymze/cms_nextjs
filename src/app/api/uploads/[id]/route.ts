import prisma from "@/utils/libs/prisma/single_instance";
import fs from "fs";
import path from "path";

export async function DELETE(req: Request) {
  // get uuid form url
  const uuid = req.url.split("/").at(-1);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // get the file from the database
  const file = await prisma.upload.findUnique({
    where: { uuid },
  });

  if (!file) return Response.json("Fichier non trouvé", { status: 404 });

  // delete the file from the public folder
  fs.unlinkSync(path.join("public", file.filepath_public));

  await prisma.upload.delete({
    where: { uuid },
  });

  return Response.json("Ok", { status: 200 });
}
