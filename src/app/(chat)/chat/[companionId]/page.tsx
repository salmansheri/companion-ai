import prisma from "@/lib/prismaDB";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ChatClient from "./components/client";

interface ChatPageProps {
  params: {
    companionId: string;
  };
}
export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  return {
    title: companion?.name,
    description: companion?.description,
    icons: [companion?.src!],
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { userId } = auth();

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId: userId!,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/");
  }

  if (!userId) {
    return redirectToSignIn();
  }
  return <ChatClient data={companion} />;
}
