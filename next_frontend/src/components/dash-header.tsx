import { CirclePlus } from "lucide-react";
import { DashSearchBar } from "./dash-search";
import { Button } from "./ui/button";

export function DashHeader() {
  return (
    <div className="flex flex-row items-center justify-between">
      <DashSearchBar />
      <Button variant="secondary" className="space-x-2">
        <CirclePlus className="size-5" />
        <span>Add new post</span>
      </Button>
    </div>
  );
}
