import prisma from "@/lib/prismaDB";
import { CompanionFormSchema } from "@/lib/validators/companion-form-schema";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await currentUser();

    const { categoryId, description, instructions, name, seed, src } =
      CompanionFormSchema.parse(body);

    if (!user || !user.id || !user.firstName) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    if (
      !categoryId ||
      !description ||
      !instructions ||
      !name ||
      !seed ||
      !src
    ) {
      return new Response("Bad Request", {
        status: 400,
      });
    }

    // TODO: check for the description

    const companion = await prisma.companion.create({
      data: {
        categoryId,
        instructions,
        userId: user.id,
        name,
        seed,
        src,
        userName: `${user.firstName} ${user.lastName}`,
        description,
      },
    });

    return new Response(JSON.stringify(companion), {
      status: 200,
    });
  } catch (error) {
    console.log("[COMPANION_POST]", error);

    if (error instanceof z.ZodError) {
      return new Response("Not Allowed", {
        status: 422,
      });
    }

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
