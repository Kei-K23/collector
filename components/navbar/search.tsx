import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <form className="rounded-md border-[1.5px] bg-white dark:bg-black flex items-center">
      <Input
        className="bg-transparent ring-0 outline-none border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search"
      />
      <Button size={"sm"} variant={"ghost"} className="rounded-full">
        <SearchIcon className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default Search;
