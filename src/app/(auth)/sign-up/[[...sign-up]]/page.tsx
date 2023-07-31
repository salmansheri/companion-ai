import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign up | Companion.ai",
  description: "Sign up to companion.ai",
};

export default function SignUpPage() {
  return <SignUp />;
}
