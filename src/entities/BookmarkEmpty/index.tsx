import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

export const BookmarkEmpty = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.bookmarkEmptyContainer}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="Bookmark is empty"
        className={styles.bookmarkEmptyImage}
      />

      <h2 className={styles.bookmarkEmptyTitle} data-i18n="bookmark.emptyTitle">
        {t("empty.title")}
      </h2>

      <p className={styles.bookmarkEmptyDescription}>
        {t("empty.subtitle")}
      </p>

      <Link to="/" className={styles.goHomeButton}>
        {t("page_block.link")}
      </Link>
    </div>
  );
};
