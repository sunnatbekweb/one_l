import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { useTranslation } from "react-i18next";
import { fetchBookmarks } from "@/widgets/BookmarkList/model/getBookmarkSlice";
import { FaBell, FaBookmark, FaSearch } from "react-icons/fa";
import { FaCirclePlus, FaFileLines } from "react-icons/fa6";
import styles from "./style.module.css";
import { fetchNotifications } from "@/entities/NotificationList/model/notificationSlice";

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookmarks } = useSelector((state: RootState) => state.bookmarks);
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchBookmarks());
    dispatch(fetchNotifications());
  }, [dispatch]);

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
          {bookmarks.length > 0 && (
            <strong className={`${styles.navSavedCount}`} id="nav-saved-count">
              {bookmarks.length}
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
          {notifications.length > 0 && (
            <strong className={`${styles.navSavedCount}`} id="nav-saved-count">
              {notifications.length}
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
