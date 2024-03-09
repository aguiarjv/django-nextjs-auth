"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function DashSearchBar() {
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    if (search) {
      params.set("title", search);
    } else {
      params.delete("title");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-56 flex flex-row gap-1 items-center justify-center"
    >
      <Input
        className="h-9"
        placeholder="Search title..."
        onChange={(e) => setSearch(e.target.value)}
        defaultValue={searchParams.get("title")?.toString()}
      />
      <Button
        size="icon"
        className="size-9 w-10 rounded-md"
        variant="outline"
        type="submit"
      >
        <Search className="size-5" />
      </Button>
    </form>
  );
}
