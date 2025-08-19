import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { Slider } from "../Input/Slider";
import { fetchNotifications } from "@/entities/NotificationList/model/notificationSlice";
import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { FaMapMarkedAlt } from "react-icons/fa";
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

  const [localChecked, setLocalChecked] = useState<boolean>(() => {
    const saved = Cookies.get(`notify_${origin}_${destination}`);
    return saved ? JSON.parse(saved) : isNotified;
  });

  useEffect(() => {
    const saved = Cookies.get(`notify_${origin}_${destination}`);
    if (!saved) {
      setLocalChecked(isNotified);
      Cookies.set(
        `notify_${origin}_${destination}`,
        JSON.stringify(isNotified),
        { expires: 365 }
      );
    }
  }, [isNotified, origin, destination]);

  const setNotification = async (enabled: boolean) => {
    setLocalChecked(enabled);

    if (enabled) {
      Cookies.set(`notify_${origin}_${destination}`, JSON.stringify(true), {
        expires: 365,
      });
    } else {
      Cookies.remove(`notify_${origin}_${destination}`);
    }

    setLoading(true);
    try {
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

      setLocalChecked(!enabled);
      if (enabled) {
        Cookies.remove(`notify_${origin}_${destination}`);
      } else {
        Cookies.set(`notify_${origin}_${destination}`, JSON.stringify(true), {
          expires: 365,
        });
      }
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
          <div className="my-5 flex flex-col gap-y-3">
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-start gap-2 text-sm sm:text-base">
                <FaMapMarkedAlt className="mt-0.5 text-blue-500 text-lg" />
                <span>
                  <span className="font-semibold">
                    {t("notification.option1_bold")}
                  </span>{" "}
                  — {t("notification.option1_normal")}
                </span>
              </div>
              <Slider
                checked={localChecked}
                disabled={loading}
                onChange={(v) => setNotification(v)}
              />
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
