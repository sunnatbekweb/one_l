import { Link } from "react-router-dom";
import { FaAngleDown, FaBars, FaGlobe } from "react-icons/fa";
import styles from "./style.module.css";

export const Header = () => {
  return (
    <header className={`${styles.headerSection}`}>
      <div className={`container ${styles.headerCont}`}>
        <Link to={"/"} className={`${styles.logo}`}>
          1LOG
        </Link>
        <div className={`${styles.headerMenu}`}>
          <div>
            <div className={`${styles.setMoney}`}>
              <div className={`${styles.headerSelect}`}>
                <span>USD</span>
                <FaAngleDown fontSize={20} />
              </div>
              <div className={`${styles.setMoneyCont}`}></div>
            </div>
          </div>

          <div>
            <div className={`${styles.setLang}`}>
              <div className={`${styles.headerSelect}`}>
                <FaGlobe fontSize={20} />
                <span>RU</span>
              </div>
              <div className={`${styles.setLangCont}`}></div>
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
