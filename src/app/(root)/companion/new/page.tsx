import React from "react";
import CompanionForm from "../[companionId]/components/companion-form";
import { getCategories } from "@/lib/actions/get-categories";

export default async function NewCompanionPage() {
  const categories = await getCategories();
  return (
    <div className="my-10">
      <CompanionForm categories={categories} />;
    </div>
  );
}
