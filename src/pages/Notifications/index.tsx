import { NotificationEmpty } from "@/entities/NotificationEmpty";
import { useScroll } from "@/shared/lib/useScroll";
import { useTranslation } from "react-i18next";

export const Notifications = () => {
  const { t } = useTranslation();
  useScroll();
  return (
    <section>
      <div className="py-[15px]">
        <h2 className="font-bold text-3xl text-[#2c2c2cde] text-center mb-2.5">
          {t("nav.notifications")}
        </h2>
        <NotificationEmpty />
      </div>
    </section>
  );
};
