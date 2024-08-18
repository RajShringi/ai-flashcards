"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast, useToast } from "@/components/ui/use-toast";

import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastAction } from "@radix-ui/react-toast";

const FormSchema = z.object({
  topic: z
    .string()
    .min(2, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [flashcards, setFlashcards] = useState<
    { front: string; back: string }[]
  >([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, "form data");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "user", content: data.topic }),
      });
      const d = await res.json();

      setFlashcards(d.flashcards);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-[900px] mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about flashcard topic"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

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
        <div className="flex items-center justify-center">
          {flashcards.length > 0 && <DialogDemo flashcards={flashcards} />}
        </div>
      </section>
    </div>
  );
}

function DialogDemo({
  flashcards,
}: {
  flashcards: { front: string; back: string }[];
}) {
  const [name, setName] = useState("");
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (isLoaded && user) {
        const userRef = doc(db, "users", user.id);
        const flashcardRef = collection(userRef, "flashcards");
        await addDoc(flashcardRef, {
          name,
          flashcards,
        });
        router.push("/flashcards");
        console.log("added the flashcard");
      }
    } catch (error) {
      console.log(error);
    }

    // try {
    //   if (user) {
    //     const userDocRef = doc(db, "users", user.id);
    //     const subcollectionDocRef = doc(userDocRef, name, "flashcardsData");
    //     const docSnapshot = await getDoc(subcollectionDocRef);
    //     if (docSnapshot.exists()) {
    //       console.log("Subcollection and document already exist.");
    //       // Handle the case where the subcollection already exists
    //       // For example, you could merge the new flashcards with existing ones
    //       // Or update the document in a specific way
    //       toast({
    //         description: `${name} already exists`,
    //         duration: 2000,
    //         variant: "destructive",
    //       });
    //     } else {
    //       // If the document doesn't exist, create it with the flashcards array
    //       await setDoc(subcollectionDocRef, {
    //         flashcards: flashcards,
    //       });
    //       router.push("/flashcards");
    //       console.log("Subcollection created and data added successfully.");
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error creating subcollection and adding data: ", error);
    // }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Save Flashcards</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Flashcards</DialogTitle>
          <DialogDescription>
            Name your flashcards collection for easy reference and organization.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
