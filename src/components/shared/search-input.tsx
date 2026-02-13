"use client";

import { Search, XIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SearchInput() {
  const [search, setSearch] = useState('');

  const handleClearSearch = () => {
    setSearch('');
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  }

  return (
    <div className="hidden w-[63%] min-w-[600px] md:flex">
      <form className="relative w-full" onSubmit={handleSearch}>
        <Search
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          placeholder="Tìm kiếm..."
          className="border-none bg-input px-10 py-2 rounded-full transition-colors focus-visible:bg-background focus-visible:ring-offset-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={
            cn(
              "absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 hover:text-gray-900 hover:bg-transparent",
              !search && "opacity-0 pointer-events-none"
            )
          }
          onClick={handleClearSearch}
        >
          <XIcon className="size-4" />
          <span className="sr-only">Clear</span>
        </Button>
      </form>
    </div>
  );
}
