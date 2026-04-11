"use client";

import { Button } from "@/components/ui/button";
import { useLogOut } from "@/features/auth/hooks/use-auth";


export default function Home() {
  const { mutate: onLogOut, isPending } = useLogOut();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button onClick={onLogOut} disabled={isPending}>
        Logout
      </Button>
    </div>
  );
}
