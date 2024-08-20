import React from "react";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: number };
}) {
  return (
    <div className="max-w-[600px] w-full mx-auto my-8 flex flex-col gap-2 items-center justify-center">
      <h1 className="text-4xl font-bold">Thank You</h1>
      <h2 className="text-2xl">Payment Successful! 🎉</h2>
    </div>
  );
}
