import { getCategories } from "@/lib/actions/get-categories";
import { getCompanionById } from "@/lib/actions/get-companions";
import { Metadata } from "next";
import CompanionForm from "./components/companion-form";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { categoryId: string };
}): Promise<Metadata> {
  const companion = await getCompanionById(params.categoryId);

  return {
    title: companion.name,
    description: companion.name,
  };
}

export default async function CompanionPage({
  params,
}: {
  params: { companionId: string };
}) {
  const companion = await getCompanionById(params.companionId);
  const categories = await getCategories();

  return <CompanionForm initialData={companion} categories={categories} />;
}