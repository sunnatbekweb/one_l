import { Link } from "react-router-dom";
import { FaAngleDown, FaBars, FaGlobe } from "react-icons/fa";
import styles from "./style.module.css";
import { LangDropdown } from "./ui/LangDropdown";
import { useState } from "react";

export const Header = () => {
  const [openLangDropdown, setOpenLangDropdown] = useState(false);
  const closeDropdown = () => setOpenLangDropdown(false);

  return (
    <header className={`${styles.headerSection}`}>
      <div className={`container ${styles.headerCont}`}>
        <Link to={"/"} className={`${styles.logo}`}>
          1LOG
        </Link>
        <div className={`${styles.headerMenu} h-full`}>
          <div>
            <div className={`${styles.setMoney}`}>
              <div className={`${styles.headerSelect}`}>
                <span>USD</span>
                <FaAngleDown fontSize={20} />
              </div>
              <div className={`${styles.setMoneyCont}`}></div>
            </div>
          </div>

          <div className="relative h-full">
            <div
              onClick={() => setOpenLangDropdown(!openLangDropdown)}
              onMouseLeave={closeDropdown}
              className={`${styles.setLang} h-full flex items-center`}
            >
              <div className={`${styles.headerSelect}`}>
                <FaGlobe fontSize={20} />
                <span>RU</span>
              </div>
              <div className={`${styles.setLangCont}`}></div>
              <LangDropdown isOpen={openLangDropdown} onClose={closeDropdown} />
            </div>
          </div>

          <div>
            <FaBars fontSize={20} />
          </div>
        </div>
      </div>
    </header>
  );
};
