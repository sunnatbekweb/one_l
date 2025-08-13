import React from "react";
import { formatCustomDate, formatRelativeDate } from "@/shared/lib/formatDate";
import { fetchBookmarks } from "@/widgets/BookmarkList/model/getBookmarkSlice";
import { sendBookmarkCargo } from "@/widgets/BookmarkList/model/postBookmarkSlice";
import { removeBookmarkCargo } from "@/widgets/BookmarkList/model/deleteBookmarkSlice";
import { useCountryFlag } from "@/entities/CargoCard/lib/useCountryFlag.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import type { Cargo } from "@/shared/types/cargo";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaMaximize, FaTemperatureHalf } from "react-icons/fa6";
import {
  FaBookmark,
  FaRegBell,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaRegClock,
  FaTruck,
  FaWeightHanging,
} from "react-icons/fa";
import styles from "./style.module.css";

interface CargoCardProps {
  cargo: Cargo;
}

export const CargoCard: React.FC<CargoCardProps> = ({ cargo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { bookmarks } = useSelector((state: RootState) => state.bookmarks);
  const isBookmarked = bookmarks.some(
    (bookmark) => bookmark.cargo.id === cargo.id
  );

  const handleBookmark = () => {
    const userId = Number(Cookies.get("user_id"));

    if (isBookmarked) {
      const bookmark = bookmarks.find((b) => b.cargo.id === cargo.id);
      if (bookmark) {
        dispatch(removeBookmarkCargo(bookmark.id)).then(() => {
          dispatch(fetchBookmarks());
        });
      }
    } else {
      dispatch(
        sendBookmarkCargo({
          user: userId,
          cargo: cargo.id,
        })
      ).then(() => {
        dispatch(fetchBookmarks());
      });
    }
  };

  const formattedDate = formatCustomDate(cargo.date);
  const relativeCreatedAt = formatRelativeDate(cargo.created_at);

  const { flag: originFlag } = useCountryFlag(cargo.origin_country);
  const { flag: destinationFlag } = useCountryFlag(cargo.destination_country);

  return (
    <div className={styles["search-result"]}>
      <div className={styles["search-result__header"]}>
        <span className={styles["search-result__time"]}>
          <button onClick={() => handleBookmark()}>
            {isBookmarked ? (
              <FaBookmark fontSize={18} />
            ) : (
              <FaRegBookmark fontSize={18} />
            )}
          </button>
          <FaRegBell fontSize={18} />
          <span className="flex items-center gap-x-1">
            <FaRegClock fontSize={18} />
            <span className="text-sm text-gray-500">{relativeCreatedAt}</span>
          </span>
        </span>
        <span className={styles["search-result__price"]}>
          {typeof cargo?.price === "number" ? (
            <>
              {cargo.price.toLocaleString()}{" "}
              {cargo.price <= 100_000
                ? "USD"
                : cargo.price <= 999_999
                  ? "RUB"
                  : "UZS"}
            </>
          ) : (
            t("fraxt")
          )}
        </span>
      </div>

      <div className={styles["search-result__route"]}>
        <div className={styles["search-result__city"]}>
          {originFlag?.flags?.png && (
            <img
              className="w-5 sm:w-10 h-full object-cover"
              src={originFlag.flags.png}
              alt={originFlag.flags.alt}
            />
          )}
          <strong className={"text-base sm:text-xl line-clamp-1"}>
            {cargo?.origin}
          </strong>
        </div>
        <div className={styles["search-result__distance"]}>
          <span>📍</span>
          <div className={styles["distance-center"]}>
            <div className={styles["distance-center-line"]}></div>
            {cargo?.km && <div>{cargo?.km?.toLocaleString()} км</div>}
          </div>
          <span>📍</span>
        </div>
        <div className={styles["search-result__city"]}>
          {destinationFlag?.flags?.png && (
            <img
              className="w-5 sm:w-10 h-full object-cover"
              src={destinationFlag.flags.png}
              alt={destinationFlag.flags.alt}
            />
          )}
          <strong className={"text-base sm:text-xl line-clamp-1"}>
            {cargo?.destination}
          </strong>
        </div>
      </div>

      <div className={styles["search-result__details"]}>
        <div className="flex items-center gap-x-1">
          <FaRegCalendarAlt fontSize={18} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaTruck fontSize={18} />
          <span className="line-clamp-1">{cargo?.car_type}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaWeightHanging fontSize={18} />
          <span>
            {cargo?.weight > 1000 ? cargo.weight / 1000 : cargo?.weight}т
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <FaMaximize fontSize={18} />
          <span>
            {cargo?.volume > 1000 ? cargo.volume / 1000 : cargo?.volume}
            м³
          </span>
        </div>
        {cargo?.temperature && (
          <div className="flex items-center gap-x-1">
            <FaTemperatureHalf fontSize={18} />
            <span>{cargo?.temperature}°C</span>
          </div>
        )}
      </div>

      <div className={styles["search-result__footer"]}>
        <span className={styles["search-result__cargo"]}>📦 {cargo?.type}</span>
        <div>
          <Link
            to={`/cargo/${cargo?.id}`}
            className={`${styles["search-result__more"]} btn-more`}
          >
            {t("detail")}
          </Link>
        </div>
        <span className={styles["search-result__company"]}>
          <span className={`flex items-center gap-1 text-xs sm:text-sm`}>
            {cargo?.username}
            <img
              src="https://img.icons8.com/?size=512&id=2sZ0sdlG9kWP&format=png"
              alt="image-icon"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </span>
        </span>
      </div>
    </div>
  );
};
