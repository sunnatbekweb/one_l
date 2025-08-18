import type { AppDispatch, RootState } from "@/app/store";
import { CargoCard } from "@/entities/CargoCard";
import { NotificationEmpty } from "@/entities/NotificationEmpty";
import { fetchNotifications } from "@/entities/NotificationList/model/notificationSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const Notifications = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, isloading, error } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <section>
      <div className="py-[15px]">
        <h2 className="font-bold text-3xl text-[#2c2c2cde] text-center mb-2.5">
          {t("nav.notifications")}
        </h2>
        {isloading ? (
          <div className="text-center">{t("loading")}</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1">
            {notifications.length > 0 ? (
              notifications.map((n) => <CargoCard cargo={n} key={n?.id} />)
            ) : (
              <NotificationEmpty />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
