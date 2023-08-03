import Categories from "@/components/categories";
import Companions from "@/components/companions";
import SearchInput from "@/components/input/search-input";
import { getCategories } from "@/lib/actions/get-categories";
import { getCompanionsByCategoryId } from "@/lib/actions/get-companions";

interface HomePageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const { name, categoryId } = searchParams;
  const companions = await getCompanionsByCategoryId(categoryId, name);

  const categories = await getCategories();
  console.log(companions);

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />

      <Companions data={companions} />
    </div>
  );
}
