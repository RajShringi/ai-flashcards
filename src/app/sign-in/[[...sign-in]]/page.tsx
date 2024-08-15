"use client";
import { SignIn } from "@clerk/clerk-react";

export default function Signin() {
  return (
    <div className="flex items-center justify-center my-6">
      <SignIn
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            formButtonPrimary:
              "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
          },
        }}
      />
    </div>
  );
}
