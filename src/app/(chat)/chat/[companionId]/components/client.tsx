"use client";

import React from "react";
import { Message, Companion } from "@prisma/client";
import ChatHeader from "./chat-header";

interface ChatClientProps {
  data: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatClient = ({ data }: ChatClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader data={data} />
    </div>
  );
};

export default ChatClient;
