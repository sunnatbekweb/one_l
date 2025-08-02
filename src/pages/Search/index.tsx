import { SearchTab } from "@/entities/ui/SearchTab";
import styles from "./style.module.css";

export const Search = () => {
  return (
    <section>
      <div className={`${styles["*search-container"]} `}>
        <SearchTab />
      </div>
    </section>
  );
};
