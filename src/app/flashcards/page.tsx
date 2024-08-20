"use client";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

type Flashcards = {
  id: string;
  name: string;
  flashcards: { front: string; back: string }[];
};

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState<Flashcards[]>([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFlashcards() {
      setLoading(true);
      try {
        if (user) {
          const userRef = doc(db, "users", user.id);
          const flashcardRef = collection(userRef, "flashcards");
          const querySnapshot = await getDocs(flashcardRef);
          const flashcards: Flashcards[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as {
              name: string;
              flashcards: { front: string; back: string }[];
            }),
          }));
          setFlashcards(flashcards);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      getFlashcards();
    }
  }, [user]);

  if (loading) {
    return <div className="flex items-center justify-center">Loading.....</div>;
  }

  return (
    <div className="px-32 flex flex-col gap-4">
      <h2 className="font-semibold text-3xl">All Flashcards</h2>
      <hr />
      {flashcards.length > 0 ? (
        <div className="flex gap-4">
          {flashcards.map((flashcard) => (
            <Link
              href={`/flashcards/${flashcard.id}`}
              key={flashcard.id}
              className="p-4 border border-gray-300 rounded-lg bg-white"
            >
              {flashcard.name}
            </Link>
          ))}
        </div>
      ) : (
        <div className="max-w-[600px] mx-auto flex flex-col items-center justify-center gap-4 mt-6">
          <Frown size={64} className="text-gray-400" />
          <div>
            It looks like you haven't created any topics yet. Start by adding a
            new topic to organize your flashcards and enhance your learning
            experience!
          </div>
          <Button>
            <Link href={"/generate"}>Create Topic</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
