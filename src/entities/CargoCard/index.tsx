import {
  FaRegBell,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaRegClock,
  FaTruck,
  FaWeightHanging,
} from "react-icons/fa";
import styles from "./style.module.css";
import { FaMaximize, FaTemperatureHalf } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const CargoCard = ({ index }: { index: number }) => {
  return (
    <div className={styles["search-result"]}>
      <div className={styles["search-result__header"]}>
        <span className={styles["search-result__time"]}>
          <FaRegBookmark fontSize={18} />
          <FaRegBell fontSize={18} />
          <span className="flex items-center gap-x-1">
            <FaRegClock fontSize={18} />
            <span className="text-sm text-gray-500">2 минуты назад</span>
          </span>
        </span>
        <span className={styles["search-result__price"]}>5 000 USD</span>
      </div>

      <div className={styles["search-result__route"]}>
        <div className={styles["search-result__city"]}>
          <span className={`fi fi-ru fis ${styles["flag-icon"]}`}></span>
          <strong>Москва</strong>
        </div>
        <div className={styles["search-result__distance"]}>
          <span>📍</span>
          <div className={styles["distance-center"]}>
            <div className={styles["distance-center-line"]}></div>
            <div>3 200 км</div>
          </div>
          <span>📍</span>
        </div>
        <div className={styles["search-result__city"]}>
          <span className={`fi fi-uz fis ${styles["flag-icon"]}`}></span>
          <strong>Ташкент</strong>
        </div>
      </div>

      <div className={styles["search-result__details"]}>
        <div className="flex items-center gap-x-1">
          <FaRegCalendarAlt /> <span>02.08.2025</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaTruck /> <span>Реф</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaWeightHanging /> <span>20 т</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaMaximize /> <span>82 м³</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaTemperatureHalf /> <span>+4°C</span>
        </div>
      </div>

      <div className={styles["search-result__footer"]}>
        <span className={styles["search-result__cargo"]}>
          📦 Овощи и фрукты
        </span>
        <div>
          <Link
            to={`/cargo/${index}`}
            className={`${styles["search-result__more"]} btn-more`}
          >
            Подробнее
          </Link>
        </div>
        <span className={styles["search-result__company"]}>
          <span className={styles["check-cont"]}>
            ООО "Пример-Логистика"
            <img
              src="https://img.icons8.com/?size=512&id=2sZ0sdlG9kWP&format=png"
              alt="image-icon"
              className="inst-icon"
            />
          </span>
          <span>logistics (10.0)</span>
        </span>
      </div>
    </div>
  );
};
