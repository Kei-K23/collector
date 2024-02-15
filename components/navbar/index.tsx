import { BookTextIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Search from "./search";
import UserButton from "../user-button";
import { ModeToggle } from "../theme-toggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full ">
      <nav className="h-20 flex items-center justify-between py-5 px-4 md:px-16 lg:px-24 border-b dark:border-b-slate-800 border-b-slate-300 dark:bg-slate-900/95 bg-slate-200/95">
        <Link href={"/"} className="flex items-center gap-2 group">
          <BookTextIcon className="w-7 md:w-8 h-7 md:h-8 text-purple-500 group-hover:text-purple-600 transition-all" />{" "}
          <span className="text-lg md:text-xl font-bold group-hover:underline transition-all">
            Collector
          </span>
        </Link>
        <Search />
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
