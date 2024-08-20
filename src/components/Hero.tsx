"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  const { isLoaded, user } = useUser();
  console.log(isLoaded);

  return (
    <section className="flex justify-center items-center h-[70vh]">
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div> */}
      <div className="flex flex-col items-center gap-4 max-w-[800px]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          AI-Powered Flashcards for Effective Learning
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">
          Enhance your study sessions with intelligent flashcards that adapt to
          your learning style.
        </p>

        {isLoaded && (
          <Button variant="default">
            {user ? (
              <Link href={"/generate"}>Get Started</Link>
            ) : (
              <Link href={"/sign-up"}>Sign in to Get started</Link>
            )}
          </Button>
        )}
      </div>
    </section>
  );
}
