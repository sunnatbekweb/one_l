import { useTranslation } from "react-i18next";
import "./modal.css";
import { Slider } from "../Input/Slider";
import { FaBox, FaMapMarkedAlt, FaUser } from "react-icons/fa";

interface ModalProps {
  modal: boolean;
  close: () => void;
}

export const NotificationModal: React.FC<ModalProps> = ({ modal, close }) => {
  const { t } = useTranslation();

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
            <div className="flex items-center gap-5">
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

              <div>
                <Slider />
              </div>
            </div>
            <div className="flex items-center gap-5">
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
            <div className="flex items-center gap-5">
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
