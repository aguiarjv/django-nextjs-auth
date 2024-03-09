import { auth, signOut } from "@/auth";
import { ModeToggle } from "./theme-toggler";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { LogOut } from "lucide-react";

export async function DashSideBar() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-3">
      <div className="flex flex-row gap-3 items-center justify-evenly ">
        <p className="text-muted-foreground text-sm font-medium">
          {session?.user?.email}
        </p>
        <ModeToggle />
      </div>
      <Separator className="-mt-2 mb-3" />
      {/* <Button variant="ghost" className="text-md"> */}
      {/*   <Link href="/dashboard">Posts List</Link> */}
      {/* </Button> */}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button
          variant="destructive"
          className="flex flex-row items-center justify-center  gap-2"
        >
          <p>Sign Out</p>
          <LogOut className="size-5" />
        </Button>
      </form>
    </div>
  );
}
