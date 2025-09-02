import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatCustomDate, formatRelativeDate } from "@/shared/lib/formatDate";
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetBookmarksQuery,
} from "@/features/bookmark/bookmarkApi";
import { useGetRoutesQuery } from "@/features/routes/routesApi";
import { useCurrency } from "./lib/useCurrency";
import { NotificationModal } from "@/shared/ui/Modal/NotificationModal";
import { useCountryFlag } from "@/shared/lib/useCountryFlag";
import type { Cargo } from "@/shared/types/cargo";
import { FaMaximize, FaTemperatureHalf } from "react-icons/fa6";
import {
  FaBell,
  FaBookmark,
  FaRegBell,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaRegClock,
  FaTruck,
  FaWeightHanging,
} from "react-icons/fa";
import styles from "./style.module.css";

export const CargoCard = ({ cargo }: { cargo: Cargo }) => {
  const { t } = useTranslation();
  const [notificationModal, setNotificationModal] = useState(false);
  const [createBookmark] = useCreateBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();
  const { data: bookmrakData } = useGetBookmarksQuery();
  const { data: routeData } = useGetRoutesQuery();
  const isBookmarked = bookmrakData?.some(
    (bookmark) => bookmark?.cargo?.id === cargo?.id
  );

  const isNotified =
    routeData?.some(
      (route) =>
        route.origin === cargo.origin && route.destination === cargo.destination
    ) ?? false;

  const handleBookmark = () => {
    if (isBookmarked) {
      const bookmark = bookmrakData?.find((b) => b.cargo.id === cargo.id);
      if (bookmark) {
        deleteBookmark(bookmark?.id);
      }
    } else {
      createBookmark({
        user: Number(localStorage.getItem("user_id")),
        cargo: cargo?.id,
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
            {isNotified ? (
              <FaBell fontSize={18} />
            ) : (
              <FaRegBell fontSize={18} />
            )}
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
          {originFlag && (
            <img
              className="w-5 sm:w-10 h-full object-cover"
              src={originFlag}
              alt={originFlag}
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
          {destinationFlag && (
            <img
              className="w-5 sm:w-10 h-full object-cover"
              src={destinationFlag}
              alt={destinationFlag}
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
        <span className={styles["search-result__cargo"]}>📦 {cargo?.type}</span>
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
              {cargo?.first_name?.length > 6
                ? cargo?.first_name.slice(0, 6) + "..."
                : cargo?.first_name}
              {/* {cargo?.last_name?.length > 6
                ? cargo?.last_name.slice(0, 6)
                : cargo?.last_name} */}
            </span>
          </p>
        </div>
      </div>
      <NotificationModal
        modal={notificationModal}
        close={closeModal}
        origin={cargo?.origin}
        destination={cargo?.destination}
        isChecked={isNotified}
      />
    </div>
  );
};
