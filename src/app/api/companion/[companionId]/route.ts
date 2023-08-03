import prisma from "@/lib/prismaDB";
import { CompanionFormSchema } from "@/lib/validators/companion-form-schema";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";

export async function PATCH(
  request: Request,
  { params }: { params: { companionId: string } },
) {
  try {
    const body = await request.json();
    const user = await currentUser();

    if (!user || !user.id || !user.firstName) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { name, categoryId, description, instructions, seed, src } =
      CompanionFormSchema.parse(body);
    const companion = await prisma.companion.update({
      where: {
        id: params.companionId,
      },
      data: {
        name,
        categoryId,
        description,
        src,
        instructions,
        seed,
      },
    });

    return new Response(JSON.stringify(companion), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
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
export async function DELETE(
  request: Request,
  { params }: { params: { companionId: string } },
) {
  try {
    const companion = await prisma.companion.delete({
      where: {
        id: params.companionId,
      },
    });

    return new Response(JSON.stringify(companion), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
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
