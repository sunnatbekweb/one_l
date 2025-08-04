import { Link } from "react-router-dom";
import styles from "./style.module.css";

export const BookmarkEmpty = () => {
  return (
    <div className={styles.bookmarkEmptyContainer}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="Bookmark is empty"
        className={styles.bookmarkEmptyImage}
      />

      <h2 className={styles.bookmarkEmptyTitle} data-i18n="bookmark.emptyTitle">
        Saqlanganlar hozircha yo‘q
      </h2>

      <p className={styles.bookmarkEmptyDescription}>
        Barcha saqlangan yuklar shu sahifada ko‘rinadi.
      </p>

      <Link to="/" className={styles.goHomeButton}>
        Asosiy sahifaga
      </Link>
    </div>
  );
};
