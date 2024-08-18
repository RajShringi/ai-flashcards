"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

export default function Subscription() {
  const { isLoaded, user } = useUser();
  const [dbUser, setDbuser] = useState<{
    email: string;
    name: string;
    payment_status: "paid" | "unpaid" | "pending";
  } | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      const userRef = doc(db, "users", user.id);

      setDoc(userRef, {
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
        payment_status: "unpaid", // Default payment status
      })
        .then(() => {
          console.log("User info added to Firestore successfully");
          setDbuser({
            email: user.emailAddresses[0].emailAddress ?? "",
            name: user.fullName ?? "",
            payment_status: "unpaid",
          });
        })
        .catch((error) => {
          setDbuser(null);
          console.error("Error adding user info to Firestore:", error);
        });
    }
  }, [user]);

  const subscriptions = [
    {
      id: 1,
      name: "Basic Plan",
      price: "$5/month",
      features: ["Access to basic flashcards", "Limited AI assistance"],
    },
    {
      id: 2,
      name: "Pro Plan",
      price: "$10/month",
      features: [
        "Access to all flashcards",
        "Advanced AI assistance",
        "Offline access",
      ],
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "$20/month",
      features: [
        "All features of Pro",
        "Personalized AI tutoring",
        "Priority support",
      ],
    },
  ];

  if (dbUser?.payment_status === "paid") {
    return "";
  }

  return (
    <section className="px-32 flex flex-col gap-6">
      <h2 className="text-3xl font-semibold text-center">Select Your Plan</h2>
      <div className="flex items-center justify-between gap-8">
        {subscriptions.map((plan) => (
          <div
            key={plan.id}
            className="self-stretch flex-1 flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-300 px-4 py-8 bg-white"
          >
            <h3 className="text-2xl font-semibold">{plan.name}</h3>
            <p className="text-3xl md:text-4xl font-bold">{plan.price}</p>
            <ul className="features">
              {plan.features.map((feature, index) => (
                <li className="text-gray-500 list-disc" key={index}>
                  {feature}
                </li>
              ))}
            </ul>
            {plan.name === "Basic Plan" ? (
              <Link href={"/sign-in"}>
                <Button variant="link">Choose Plan</Button>
              </Link>
            ) : (
              ""
            )}

            {plan.name === "Pro Plan" ? (
              <Link href={"/sign-in"}>
                <Button variant="secondary">Choose Plan</Button>
              </Link>
            ) : (
              ""
            )}

            {plan.name === "Premium Plan" ? (
              <Link href={"/sign-in"}>
                <Button variant="default">Choose Plan</Button>
              </Link>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
