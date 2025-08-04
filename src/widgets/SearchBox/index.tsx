import { SearchTab } from "@/entities/SearchTab";
import { SearchForm } from "@/entities/SearchForm";

export const SearchContainer = () => {
  return (
    <section className="w-full py-[5px] mx-auto bg-white p-[18px] rounded-xl shadow-lg border-2 border-[#ccc]">
      <div>
        <SearchTab />
        <SearchForm />
      </div>
    </section>
  );
};
