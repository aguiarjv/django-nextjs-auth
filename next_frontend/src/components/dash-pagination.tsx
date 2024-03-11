"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export function DashPagination({
  items,
  totalPages,
}: {
  items: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  function setNextPage(nextPage: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(nextPage));

    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="flex flex-row items-center justify-between mt-1">
      <p className="text-sm text-muted-foreground">
        Total number of items: {items}
      </p>
      <div className="flex flex-row items-center justify-center gap-1">
        <p className="text-sm mr-3">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          size="icon"
          variant="outline"
          className="size-7"
          disabled={currentPage == 1}
        >
          <Link href={setNextPage(1)}>
            <ChevronFirst />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="size-7"
          disabled={currentPage == 1}
        >
          <Link href={setNextPage(currentPage - 1)}>
            <ChevronLeft />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="size-7"
          disabled={currentPage == totalPages}
        >
          <Link href={setNextPage(currentPage + 1)}>
            <ChevronRight />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="size-7"
          disabled={currentPage == totalPages}
        >
          <Link href={setNextPage(totalPages)}>
            <ChevronLast />
          </Link>
        </Button>
      </div>
    </div>
  );
}
