"use client";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { userContextUser } from "@/context/UserContext";

export default function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { signedInUser, changeUserPaymentStatus } = userContextUser();

  useEffect(() => {
    fetch("api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeUserPaymentStatus("paid");
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      changeUserPaymentStatus("unpaid");
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="w-full max-w-[600px] mx-auto my-8 border border-gray-200 p-4 rounded-lg bg-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full max-w-[600px] mx-auto my-8 border border-gray-200 p-4 rounded-lg bg-white">
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        <div className="flex items-center justify-center pt-6">
          <Button disabled={!stripe || loading}>
            {!loading ? `Pay $${amount}` : `Processing...`}
          </Button>
        </div>
      </form>
    </div>
  );
}
