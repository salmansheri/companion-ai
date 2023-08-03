"use client";
import { Category, Companion, Message } from "@prisma/client";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface CompanionsProps {
  data:
    | (Companion & {
        _count: {
          messages: number;
        };
      })[]
    | null;
}

const Companions: React.FC<CompanionsProps> = ({ data }) => {
  if (data?.length === 0) {
    return (
      <div className="flex pt-10 flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image fill className="grayscale" alt="Empty" src="/empty.png" />
          <p className="text-sm text-muted-foreground   ">
            No Companions found
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-col-6 gap-2 pb-10">
      {data?.map((item) => (
        <Card
          key={item.id}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transtion border-0"
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  src={item?.src}
                  fill
                  className="rounded-xl object-cover"
                  alt="companion"
                />
              </div>
              <p className="font-bold">{item.name}</p>
              <p className="text-xs"></p>
            </CardHeader>
            <CardFooter className="flex items-center text-xs justify-between text-muted-foreground">
              <p className="lowercase">@{item.userName}</p>
              <div className="items-center flex ">
                <MessageSquare className="w-3 h-3 mr-1" />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Companions;
