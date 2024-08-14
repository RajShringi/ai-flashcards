import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="">
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div> */}
      <div className="relative flex items-center max-w-[600px] mx-auto py-4">
        <nav className="h-full w-full isolate rounded-xl bg-white/90 shadow-lg ring-1 ring-black/5 flex items-center justify-between p-4">
          <Link href="/">
            <h2 className="text-xl font-medium uppercase tracking-widest">
              Flash
            </h2>
          </Link>
          <ul className="flex items-center gap-4">
            <li>
              <Link href={"/"}>
                <Button variant="link">Log In</Button>
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <Button variant="default">Sign up</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
