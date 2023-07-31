import Categories from "@/components/categories";
import SearchInput from "@/components/input/search-input";
import { getCategories } from "@/lib/actions/get-categories";

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
}
