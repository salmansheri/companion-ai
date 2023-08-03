import { Companion } from "@prisma/client";
import prisma from "../prismaDB";
import { currentUser } from "@clerk/nextjs";

interface CompanionsProps {
  data: Companion & {
    _count: {
      messages: number;
    };
  };
}
export async function getCompanionsByCategoryId(
  categoryId: string,
  name: string,
) {
  const user = await currentUser();

  if (!user || !user.id || !user.firstName) return null;

  const companions = await prisma.companion.findMany({
    where: {
      categoryId,
      name: {
        contains: name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companions) {
    return null;
  }

  return companions;
}

export async function getCompanionById(id: string) {
  const companion = await prisma.companion.findUnique({
    where: {
      id: id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return companion!;
}
