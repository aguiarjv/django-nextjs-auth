import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function DashSearchBar() {
  return (
    <div className="max-w-56 flex flex-row gap-3 items-center justify-center">
      <Input className="h-9" placeholder="Search title..." />
      <Button size="icon" className="size-9 w-10 rounded-md" variant="outline">
        <Search className="size-5" />
      </Button>
    </div>
  );
}
