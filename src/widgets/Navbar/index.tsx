import { NavLink } from "react-router-dom";
import { useAppTrasnlation } from "@/shared/lib/useAppTrasnlation";
import { useGetBookmarksQuery } from "@/features/bookmark/bookmarkApi";
import { useGetNotificationsQuery } from "@/features/notification/notificationApi";
import { FaBell, FaBookmark, FaSearch } from "react-icons/fa";
import { FaCirclePlus, FaFileLines } from "react-icons/fa6";
import styles from "./style.module.css";

export const Navbar = () => {
  const { data: bookmarks } = useGetBookmarksQuery();
  const { data: notifications } = useGetNotificationsQuery();
  const { t } = useAppTrasnlation();

  return (
    <nav className={`${styles.navbarSection}`}>
      <div className={`container ${styles.navbarCont}`}>
        <NavLink to={"/"} className={`${styles.navMenuBtn} navbarMenuBtn`}>
          <FaSearch fontSize={20} />
          <span>{t("nav.search")}</span>
        </NavLink>
        <NavLink
          to={"/bookmarks"}
          className={`${styles.navMenuBtn} navbarMenuBtn`}
        >
          <FaBookmark fontSize={20} />
          <span>{t("nav.bookmarks")}</span>
          {(bookmarks?.length ?? 0) > 0 && (
            <strong className={`${styles.navSavedCount}`} id="nav-saved-count">
              {bookmarks?.length}
            </strong>
          )}
        </NavLink>
        <NavLink to={"/add"} className={`${styles.navMenuBtn} navbarMenuBtn`}>
          <FaCirclePlus fontSize={20} />
          <span>{t("nav.add")}</span>
        </NavLink>
        <NavLink
          to={"/notifications"}
          className={`${styles.navMenuBtn} navbarMenuBtn`}
        >
          <FaBell fontSize={20} />
          <span>{t("nav.notifications")}</span>
          {(notifications?.length ?? 0) > 0 && (
            <strong className={`${styles.navSavedCount}`} id="nav-saved-count">
              {notifications?.length}
            </strong>
          )}
        </NavLink>
        <NavLink
          to={"applications/"}
          className={`${styles.navMenuBtn} navbarMenuBtn`}
        >
          <FaFileLines fontSize={20} />
          <span>{t("nav.applications")}</span>
        </NavLink>
      </div>
    </nav>
  );
};
