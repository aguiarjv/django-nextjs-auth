import { CirclePlus } from "lucide-react";
import { DashSearchBar } from "./dash-search";
import { Button } from "./ui/button";

export function DashHeader() {
  return (
    <div className="flex flex-row items-center justify-between">
      <DashSearchBar />
      <Button className="space-x-1">
        <span>Add new post</span> <CirclePlus className="size-5" />
      </Button>
    </div>
  );
}
