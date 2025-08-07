import {
  FaRegBell,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaRegClock,
  FaTruck,
  FaWeightHanging,
} from "react-icons/fa";
import { formatCustomDate, formatRelativeDate } from "@/shared/lib/formatDate";
import { FaMaximize, FaTemperatureHalf } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { Cargo } from "@/shared/types/cargo";
import type { AppDispatch } from "@/app/store";
import { sendBookmarkCargo } from "./model/bookmarkSlice";
import Cookies from "js-cookie";
import styles from "./style.module.css";

interface CargoCardProps {
  cargo: Cargo;
}

export const CargoCard: React.FC<CargoCardProps> = ({ cargo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const formattedDate = formatCustomDate(cargo.date);
  const relativeCreatedAt = formatRelativeDate(cargo.created_at);

  const handleBookmark = () => {
    dispatch(
      sendBookmarkCargo({
        user: Number(Cookies.get("user_id")),
        cargo: cargo.id,
      })
    );
  };

  return (
    <div className={styles["search-result"]}>
      <div className={styles["search-result__header"]}>
        <span className={styles["search-result__time"]}>
          <button onClick={() => handleBookmark()}>
            <FaRegBookmark fontSize={18} />
          </button>
          <FaRegBell fontSize={18} />
          <span className="flex items-center gap-x-1">
            <FaRegClock fontSize={18} />
            <span className="text-sm text-gray-500">{relativeCreatedAt}</span>
          </span>
        </span>
        <span className={styles["search-result__price"]}>
          {cargo.price.toLocaleString()} USD
        </span>
      </div>

      <div className={styles["search-result__route"]}>
        <div className={styles["search-result__city"]}>
          <span
            className={`fi fi-${cargo.origin_country.toLowerCase()} fis ${
              styles["flag-icon"]
            }`}
          ></span>
          <strong>{cargo.origin}</strong>
        </div>
        <div className={styles["search-result__distance"]}>
          <span>📍</span>
          <div className={styles["distance-center"]}>
            <div className={styles["distance-center-line"]}></div>
            <div>{cargo.km.toLocaleString()} км</div>
          </div>
          <span>📍</span>
        </div>
        <div className={styles["search-result__city"]}>
          <span
            className={`fi fi-${cargo.destination_country.toLowerCase()} fis ${
              styles["flag-icon"]
            }`}
          ></span>
          <strong>{cargo.destination}</strong>
        </div>
      </div>

      <div className={styles["search-result__details"]}>
        <div className="flex items-center gap-x-1">
          <FaRegCalendarAlt />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaTruck />
          <span>{cargo.car_type}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaWeightHanging />
          <span>{cargo.weight} т</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaMaximize />
          <span>{cargo.volume} м³</span>
        </div>
        {/* Температура — если у тебя есть поле для неё */}
        {cargo.temperature && (
          <div className="flex items-center gap-x-1">
            <FaTemperatureHalf />
            <span>{cargo.temperature}°C</span>
          </div>
        )}
      </div>

      <div className={styles["search-result__footer"]}>
        <span className={styles["search-result__cargo"]}>📦 {cargo.type}</span>
        <div>
          <Link
            to={`/cargo/${cargo.id}`}
            className={`${styles["search-result__more"]} btn-more`}
          >
            Подробнее
          </Link>
        </div>
        <span className={styles["search-result__company"]}>
          <span className={styles["check-cont"]}>
            {cargo.username}
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
