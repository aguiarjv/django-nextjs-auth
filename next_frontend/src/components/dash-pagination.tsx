import { Button } from "./ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function DashPagination() {
  return (
    <div className="flex flex-row items-center justify-between mt-1">
      <p className="text-sm text-muted-foreground">
        Total number of items: 100
      </p>
      <div className="flex flex-row items-center justify-center gap-1">
        <p className="text-sm mr-3">Page 1 of 10</p>
        <Button size="icon" variant="outline" className="size-7" disabled>
          <ChevronFirst />
        </Button>
        <Button size="icon" variant="outline" className="size-7" disabled>
          <ChevronLeft />
        </Button>
        <Button size="icon" variant="outline" className="size-7">
          <ChevronRight />
        </Button>
        <Button size="icon" variant="outline" className="size-7">
          <ChevronLast />
        </Button>
      </div>
    </div>
  );
}
