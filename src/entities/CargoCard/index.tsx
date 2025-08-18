import React, { useState } from "react";
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
import { NotificationModal } from "@/shared/ui/Modal/NotificationModal";
import { useCurrency } from "./lib/useCurrency";

interface CargoCardProps {
  cargo: Cargo;
}

export const CargoCard: React.FC<CargoCardProps> = ({ cargo }) => {
  const { t } = useTranslation();
  const [notificationModal, setNotificationModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { bookmarks } = useSelector((state: RootState) => state.bookmarks);
  const isBookmarked = bookmarks.some(
    (bookmark) => bookmark?.cargo?.id === cargo?.id
  );
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const isNotified = notifications.some((n) => n?.id === cargo.id);

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

  const closeModal = () => {
    setNotificationModal(false);
  };

  const formattedDate = formatCustomDate(cargo?.date || "");
  const relativeCreatedAt = formatRelativeDate(cargo?.created_at || "");

  const { flag: originFlag } = useCountryFlag(cargo?.origin_country);
  const { flag: destinationFlag } = useCountryFlag(cargo?.destination_country);

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
          <button onClick={() => setNotificationModal(true)}>
            <FaRegBell fontSize={18} />
          </button>
          <span className="flex items-center gap-x-1">
            <FaRegClock fontSize={18} />
            <span className="text-sm text-gray-500">{relativeCreatedAt}</span>
          </span>
        </span>
        <span className={styles["search-result__price"]}>
          {typeof cargo?.price === "number" ? (
            <>
              {cargo?.price?.toLocaleString()} {useCurrency(cargo?.price)}
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
            {cargo?.origin?.length > 8
              ? cargo?.origin.slice(0, 8) + "..."
              : cargo?.origin}
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
            {cargo?.destination?.length > 8
              ? cargo?.destination.slice(0, 8) + "..."
              : cargo?.destination}
          </strong>
        </div>
      </div>

      <div className={styles["search-result__details"]}>
        <div className="flex items-center gap-x-1">
          <div>
            <FaRegCalendarAlt fontSize={18} />
          </div>
          <span className="line-clamp-1">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <div>
            <FaTruck fontSize={18} />
          </div>
          <span className="line-clamp-1">
            {cargo?.car_type?.length > 6
              ? cargo?.car_type.slice(0, 6)
              : cargo?.car_type}
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <div>
            <FaWeightHanging fontSize={18} />
          </div>
          <span>
            {cargo?.weight > 1000 ? cargo.weight / 1000 : cargo?.weight}т
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <div>
            <FaMaximize fontSize={18} />
          </div>
          <span>
            {cargo?.volume > 1000 ? cargo.volume / 1000 : cargo?.volume}
            м³
          </span>
        </div>
        {cargo?.temperature && (
          <div className="flex items-center gap-x-1">
            <div>
              <FaTemperatureHalf fontSize={18} />
            </div>
            <span>{cargo?.temperature}°C</span>
          </div>
        )}
      </div>

      <div className={styles["search-result__footer"]}>
        <span className={styles["search-result__cargo"]}>
          {cargo?.type && `📦 ${cargo?.type}`}
        </span>
        <div className="flex justify-center">
          <Link
            to={`/cargo/${cargo?.id}`}
            className={`${styles["search-result__more"]} btn-more`}
          >
            {t("detail")}
          </Link>
        </div>
        <div className={styles["search-result__company"]}>
          <p className={`flex items-center gap-1 text-xs sm:text-sm`}>
            <span className="line-clamp-1">
              {cargo?.first_name?.length > 8
                ? cargo?.first_name.slice(0, 8)
                : cargo?.first_name}
              {cargo?.last_name?.length > 8
                ? cargo?.last_name.slice(0, 8)
                : cargo?.last_name}
            </span>
            <img
              src="https://img.icons8.com/?size=512&id=2sZ0sdlG9kWP&format=png"
              alt="image-icon"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </p>
        </div>
      </div>
      <NotificationModal
        modal={notificationModal}
        close={closeModal}
        origin={cargo?.origin}
        destination={cargo?.destination}
        isNotified={isNotified}
      />
    </div>
  );
};
