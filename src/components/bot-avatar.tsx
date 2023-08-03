"use client";

import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface BotAvatarProps {
  src?: string;
  companionName: string;
}

const BotAvatar: React.FC<BotAvatarProps> = ({ src, companionName }) => {
  return (
    <Avatar className="border border-primary/10">
      <AvatarImage src={src} />
      <AvatarFallback className="inline-flex items-center justify-center w-full">
        {companionName.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
