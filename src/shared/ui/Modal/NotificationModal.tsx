import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { Slider } from "../Input/Slider";
import { fetchNotifications } from "@/entities/NotificationList/model/notificationSlice";
import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { FaBox, FaMapMarkedAlt, FaUser } from "react-icons/fa";
import "./modal.css";

interface ModalProps {
  modal: boolean;
  close: () => void;
  origin: string;
  destination: string;
  isNotified: boolean;
}

export const NotificationModal: React.FC<ModalProps> = ({
  modal,
  close,
  origin,
  destination,
  isNotified,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const setNotification = async (enabled: boolean) => {
    try {
      setLoading(true);

      if (enabled) {
        await axios.post(`${baseUrl}/user/save-route/`, {
          user: Cookies.get("user_id"),
          origin,
          destination,
        });
      } else {
        await axios.post(`${baseUrl}/user/delete-route/`, {
          user: Cookies.get("user_id"),
          origin,
          destination,
        });
      }

      dispatch(fetchNotifications());
    } catch (err) {
      console.error("Ошибка при обновлении уведомления", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={close} className={`modal ${modal ? "open" : ""}`}>
      <div onClick={(e) => e.stopPropagation()} className="modal_content">
        <h2 className="font-bold text-xl text-center">
          {t("nav.notifications")}
        </h2>
        <div className="sm:px-10 py-5">
          <strong className="font-bold">{t("notification.title")}</strong>
          <br /> <br />
          <p>
            {t("notification.subtitle1")}
            <br />
            <br />
            {t("notification.subtitle2")}
          </p>
          <div className="my-5 flex flex-col gap-y-3">
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-start gap-2 text-sm sm:text-base">
                <div>
                  <FaMapMarkedAlt className="mt-0.5 text-blue-500 text-lg" />
                </div>
                <span>
                  <span className="font-semibold">
                    {t("notification.option1_bold")}
                  </span>{" "}
                  — {t("notification.option1_normal")}
                </span>
              </div>
              <Slider
                checked={isNotified}
                disabled={loading}
                onChange={(v) => setNotification(v)}
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-start gap-2 text-sm sm:text-base">
                <div>
                  <FaBox className="mt-0.5 text-amber-300 text-lg" />
                </div>
                <span>
                  <span className="font-semibold">
                    {t("notification.option2_bold")}
                  </span>{" "}
                  — {t("notification.option2_normal")}
                </span>
              </div>

              <div>
                <Slider />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-start gap-2 text-sm sm:text-base">
                <div>
                  <FaUser className="mt-0.5 text-gray-500 text-lg" />
                </div>
                <span>
                  <span className="font-semibold">
                    {t("notification.option3_bold")}
                  </span>{" "}
                  — {t("notification.option3_normal")}
                </span>
              </div>

              <div>
                <Slider />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button onClick={close} className="button_short">
            {t("done")}
          </button>
        </div>
      </div>
    </div>
  );
};
