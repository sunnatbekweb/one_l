import { NavLink } from "react-router-dom";
import { FaBell, FaBookmark, FaSearch } from "react-icons/fa";
import { FaCirclePlus, FaFileLines } from "react-icons/fa6";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export const Navbar = () => {
  const { bookmarks } = useSelector((state: RootState) => state.bookmarks);
  return (
    <nav className={`${styles.navbarSection}`}>
      <div className={`container ${styles.navbarCont}`}>
        <NavLink to={"/"} className={`${styles.navMenuBtn} navbarMenuBtn`}>
          <FaSearch fontSize={20} />
          <span>Поиск</span>
        </NavLink>
        <NavLink
          to={"/bookmarks"}
          className={`${styles.navMenuBtn} navbarMenuBtn`}
        >
          <FaBookmark fontSize={20} />
          <span>Избранные</span>
          {bookmarks.length > 0 && (
            <strong className={`${styles.navSavedCount}`} id="nav-saved-count">
              {bookmarks.length}
            </strong>
          )}
        </NavLink>
        <NavLink to={"/add"} className={`${styles.navMenuBtn} navbarMenuBtn`}>
          <FaCirclePlus fontSize={20} />
          <span>Добавить</span>
        </NavLink>
        <NavLink
          to={"/notifications"}
          className={`${styles.navMenuBtn} navbarMenuBtn`}
        >
          <FaBell fontSize={20} />
          <span>Уведомление</span>
        </NavLink>``
        <NavLink
          to={"applications/"}
          className={`${styles.navMenuBtn} navbarMenuBtn`}
        >
          <FaFileLines fontSize={20} />
          <span>Заявки</span>
        </NavLink>
      </div>
    </nav>
  );
};
