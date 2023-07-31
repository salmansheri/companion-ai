import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign in | Companion.ai",
  description: "Sign in to Companion.ai",
};

export default function SignInPage() {
  return <SignIn />;
}
