import { BsBellSlashFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

export const NotificationEmpty = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.emptyContainer}>
      <BsBellSlashFill className="text-8xl text-[#94a6bc] mb-5" />
      <h2 className={styles.notificationEmptyTitle}>
        {t("empty.noNotification")}
      </h2>

      <p className={styles.notificationEmptyDescription}>
        {t("empty.notificationSubtitle")}
      </p>

      <Link to="/" className={styles.goHomeButton}>
        {t("empty.goSearch")}
      </Link>
    </div>
  );
};
