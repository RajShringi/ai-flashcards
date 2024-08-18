"use client";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase.config";

export default function Flashcard() {
  const { user } = useUser();
  const { flashcardId }: { flashcardId: string } = useParams();
  const [flashcards, setFlashcards] = useState<
    { front: string; back: string }[]
  >([]);

  useEffect(() => {
    async function getFlashcards() {
      try {
        if (user) {
          const userRef = doc(db, "users", user.id);
          const flashcardRef = doc(userRef, "flashcards", flashcardId);

          const docSnapshot = await getDoc(flashcardRef);

          if (docSnapshot.exists()) {
            const flashcards = docSnapshot.data().flashcards;
            setFlashcards(flashcards);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (user) {
      getFlashcards();
    }
  }, [user]);

  return (
    <div className="max-w-[900px] mx-auto">
      <section>
        <div className="grid gap-6 grid-cols-3 my-6">
          {flashcards.map((flashcard, index: number) => (
            <div
              key={index}
              className="group bg-transparent w-full h-40 [perspective:1000px] cursor-pointer"
            >
              <div className="relative w-full h-full text-center transition-transform duration-300 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div className="absolute w-full h-full bg-white flex items-center justify-center [backface-visibility:hidden] p-4 border border-gray-300 overflow-hidden rounded-lg">
                  {flashcard.front}
                </div>
                {/* Back Side */}
                <div className="absolute w-full h-full bg-white flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] p-4 border border-gray-300 overflow-hidden rounded-lg">
                  {flashcard.back}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
