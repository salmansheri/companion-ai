"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LucideTimerReset } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log(error);
  }, [error]);

  const createNew = () => {
    router.push("/companion/new");
  };
  return (
    <div className="flex min-h-screen items-center justify-center flex-col space-y-3">
      <h2>Cannot Find the Companion Please create Companion to Continue</h2>

      <Button onClick={() => reset()}>
        <LucideTimerReset />
        reset
      </Button>
      <Button onClick={createNew}>Create New</Button>
    </div>
  );
}
