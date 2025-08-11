import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaBars, FaGlobe } from "react-icons/fa";
import { LangDropdown } from "./ui/LangDropdown";
import styles from "./style.module.css";

export const Header = () => {
  const [openLangDropdown, setOpenLangDropdown] = useState(false);
  const closeDropdown = () => setOpenLangDropdown(false);
  const { i18n } = useTranslation();

  return (
    <header className={`${styles.headerSection}`}>
      <div className={`container ${styles.headerCont}`}>
        <Link to={"/"} className={`${styles.logo}`}>
          1LOG
        </Link>
        <div className={`${styles.headerMenu} h-full`}>
          <div>
            <select
              name={"currency"}
              id={"currency"}
              className={"font-medium cursor-pointer focus:outline-none"}
            >
              {["USD", "EUR", "UZS", "RUB", "KZT"].map((currency, index) => (
                <option key={index} className={"text-black"} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="relative h-full">
            <div
              onClick={() => setOpenLangDropdown(!openLangDropdown)}
              onMouseLeave={closeDropdown}
              className={`${styles.setLang} h-full flex items-center`}
            >
              <div className={`${styles.headerSelect}`}>
                <FaGlobe fontSize={20} />
                <span className="uppercase">
                  {i18n.language === "uz-Cyrl"
                    ? "УЗ"
                    : i18n.language.slice(0, 2)}
                </span>
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
