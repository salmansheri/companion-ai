import { Companion } from "@prisma/client";
import prisma from "../prismaDB";

export async function getCompanionById(id: string): Promise<Companion> {
  const companion = await prisma.companion.findUnique({
    where: {
      id: id,
    },
  });

  return companion!;
}
