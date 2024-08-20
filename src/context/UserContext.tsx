"use client";

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../../firebase.config";
import { useUser } from "@clerk/nextjs";

type User = {
  id: string;
  email: string;
  name: string;
  payment_status: "paid" | "unpaid" | "pending";
  amount: number | "";
};

type UserContextType = {
  signedInUser: User;
  addUser: (user: User) => void;
  amountpayedByUser: (amount: number | "") => void;
  changeUserPaymentStatus: (status: "paid" | "unpaid" | "pending") => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { isLoaded, user } = useUser();
  const [signedInUser, setSignedInUser] = useState<User>({
    id: "",
    email: "",
    name: "",
    payment_status: "unpaid",
    amount: "",
  });

  async function getDBUser() {
    if (signedInUser?.id) {
      const userRef = doc(db, "users", signedInUser.id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const { id, name, email, payment_status, amount } = userSnap.data();
        setSignedInUser({ id, name, email, payment_status, amount });
        console.log(userSnap.data());
      }
    }
  }

  //   useEffect(() => {
  //     if (isLoaded && user && !signedInUser.id) {
  //       const userRef = doc(db, "users", user.id);

  //       setDoc(userRef, {
  //         id: user.id,
  //         email: user.emailAddresses[0].emailAddress,
  //         name: user.fullName,
  //         payment_status: "unpaid", // Default payment status
  //         amount: "",
  //       })
  //         .then(() => {
  //           console.log("User info added to Firestore successfully");
  //           addUser({
  //             id: user.id,
  //             email: user.emailAddresses[0].emailAddress ?? "",
  //             name: user.fullName ?? "",
  //             payment_status: "unpaid",
  //             amount: "",
  //           });
  //         })
  //         .catch((error) => {
  //           console.error("Error adding user info to Firestore:", error);
  //         });
  //     }
  //   }, []);

  function addUser(user: User) {
    setSignedInUser(user);
  }

  async function amountpayedByUser(amount: number | "") {
    setSignedInUser((prev) => {
      return { ...prev, amount: amount };
    });

    if (user) {
      await setDoc(doc(db, "users", user.id), {
        ...signedInUser,
        amount: amount,
      });
    }
  }

  async function changeUserPaymentStatus(
    status: "paid" | "pending" | "unpaid"
  ) {
    setSignedInUser((prev) => ({ ...prev, payment_status: status }));
    if (user) {
      await setDoc(doc(db, "users", user.id), {
        id: user.id,
        email: user.emailAddresses[0].emailAddress ?? "",
        name: user.fullName ?? "",
        amount: signedInUser.amount,
        payment_status: status,
      });
    }
  }

  return (
    <UserContext.Provider
      value={{
        signedInUser,
        addUser,
        amountpayedByUser,
        changeUserPaymentStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const userContextUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within ItemProvider");
  }
  return context;
};
