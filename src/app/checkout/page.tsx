"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "@/components/CheckoutPage";
import { useState } from "react";
import { userContextUser } from "@/context/UserContext";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const { signedInUser } = userContextUser();

  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "subscription",
          amount: convertToSubcurrency(signedInUser.amount as number),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={signedInUser.amount as number} />
      </Elements>
    </div>
  );
}
