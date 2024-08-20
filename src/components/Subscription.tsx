"use client";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { userContextUser } from "@/context/UserContext";
import { useUser } from "@clerk/nextjs";

type User = {
  id: string;
  email: string;
  name: string;
  payment_status: "paid" | "unpaid" | "pending";
  amount: number | "";
};

export default function Subscription() {
  const { isLoaded, user } = useUser();
  const { amountpayedByUser } = userContextUser();
  const [signedInUser, setSignedInUser] = useState({
    id: "",
    email: "",
    name: "",
    payment_status: "unpaid",
    amount: "",
  });
  const router = useRouter();

  async function getDBUser() {
    if (user?.id) {
      const userRef = doc(db, "users", user.id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const { id, name, email, payment_status, amount } = userSnap.data();
        setSignedInUser({ id, name, email, payment_status, amount });
      }
    }
  }

  useEffect(() => {
    getDBUser();
  }, [user]);

  const subscriptions = [
    {
      id: 1,
      name: "Basic Plan",
      price: "$5/month",
      amount: 5,
      features: ["Access to basic flashcards", "Limited AI assistance"],
    },
    {
      id: 2,
      name: "Pro Plan",
      price: "$10/month",
      amount: 10,
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
      amount: 20,
      features: [
        "All features of Pro",
        "Personalized AI tutoring",
        "Priority support",
      ],
    },
  ];

  if (!user && !isLoaded) {
    return "";
  }

  if (signedInUser?.payment_status === "paid" && user) {
    return "";
  }

  const handleClick = (amount: number) => {
    amountpayedByUser(amount);
    router.push("/checkout");
  };

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
              <Button variant="link" onClick={() => handleClick(5)}>
                Choose Plan
              </Button>
            ) : (
              ""
            )}

            {plan.name === "Pro Plan" ? (
              <Button variant="secondary" onClick={() => handleClick(10)}>
                Choose Plan
              </Button>
            ) : (
              ""
            )}

            {plan.name === "Premium Plan" ? (
              <Button variant="default" onClick={() => handleClick(20)}>
                Choose Plan
              </Button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
