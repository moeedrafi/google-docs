"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";

export const SearchInput = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative w-full max-w-180" onSubmit={() => {}}>
        <Input
          type="text"
          placeholder="Search"
          onChange={(e) => setValue(e.target.value)}
          className="h-12 px-14 bg-gray-200 w-full border-none rounded-full md:text-base placeholder:text-neutral-800 focus-visible:ring-1"
        />

        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};
