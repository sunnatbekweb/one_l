import { useGetNotificationsQuery } from "@/features/notification/notificationApi";
import { CargoCard } from "../CargoCard";
import { NotificationEmpty } from "../NotificationEmpty";
import { useAppTrasnlation } from "@/shared/lib/useAppTrasnlation";

export const NotificationList = () => {
  const { data, isLoading, error } = useGetNotificationsQuery();
  const { t } = useAppTrasnlation();

  return (
    <section>
      <div className="py-[15px]">
        <h2 className="font-bold text-3xl text-[#2c2c2cde] text-center mb-2.5">
          {t("nav.notifications")}
        </h2>
        {isLoading ? (
          <div className="text-center">{t("loading")}</div>
        ) : error ? (
          <div className="text-red-500 text-center">
            {JSON.stringify(error)}
          </div>
        ) : (
          <div className="grid grid-cols-1">
            {(data?.length ?? 0) > 0 ? (
              data?.map((n) => <CargoCard cargo={n} key={n?.id} />)
            ) : (
              <NotificationEmpty />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
