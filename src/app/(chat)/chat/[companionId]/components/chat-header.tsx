"use client";
import BotAvatar from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { Companion, Message } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ChatClientProps {
  data: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatHeader: React.FC<ChatClientProps> = ({ data }) => {
  const router = useRouter();
  const { user } = useUser();

  const { mutate: deleteCompanion, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/companion/${data?.id}`);
      return response.data;
    },
    onSuccess: () => {
      return toast({
        title: "Deleted Successfully",
        description: `Companion ${data?.name} has been successfully deleted`,
        variant: "success",
      });
    },
    onError: () => {
      router.refresh();
      router.push("/");
      return toast({
        title: "Cannot Delete Companion please Try again",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={data.src} companionName={data.name} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold ">{data.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 mr-1" />
              {data._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {data.name}
          </p>
        </div>
      </div>
      {user?.id === data.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${data.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => deleteCompanion()}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatHeader;
