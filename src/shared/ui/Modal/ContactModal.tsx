import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import type { Cargo } from "@/shared/types/cargo";
import { updateCargoActions } from "@/widgets/CargoWrapper/model/cargoPatchSlice";
import { useTranslation } from "react-i18next";
import {
  FaGlobe,
  FaPhoneSquareAlt,
  FaShareSquare,
  FaTelegram,
  FaUser,
  FaWhatsappSquare,
} from "react-icons/fa";
import "./modal.css";

interface ModalProps {
  modal: boolean;
  close: () => void;
  cargo: Cargo | null;
}

export const ContactModal: React.FC<ModalProps> = ({ modal, close, cargo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();

  const message = `Я теперь ищу грузы через 1LOG — просто, удобно и всё под рукой.

Смотри сам: https://t.me/one_log_bot

Бесплатный период начнётся автоматически, как только нажмёшь «Подробнее» на заявке.`;

  return (
    <div onClick={close} className={`modal ${modal ? "open" : ""}`}>
      <div onClick={(e) => e.stopPropagation()} className="modal_content">
        <h2 className="text-center font-semibold text-2xl">
          {t("contactModal.title")}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:px-6 mt-4 sm:mt-8 mb-2">
          {cargo?.firs_tname && cargo.last_name && (
            <div className="flex items-center gap-x-4">
              <div>
                <FaUser className="text-xl sm:text-3xl" />
              </div>
              <span className="text-sm sm:text-xl">
                {cargo?.firs_tname} {cargo?.last_name}
              </span>
            </div>
          )}
          {cargo?.phone && (
            <div className="flex items-center gap-x-4">
              <div>
                <FaPhoneSquareAlt
                  className="text-xl sm:text-3xl"
                  color="lime"
                />
              </div>
              <a
                href={`tel:${cargo?.phone}`}
                className="text-sm sm:text-xl"
                onClick={() =>
                  dispatch(
                    updateCargoActions({
                      cargoId: cargo?.id || 0,
                      data: { phoned: true },
                    })
                  )
                }
              >
                {cargo?.phone}
              </a>
            </div>
          )}
          {cargo?.username && (
            <div className="flex items-center gap-x-4">
              <div>
                <FaTelegram className="text-xl sm:text-3xl text-[#659df2]" />
              </div>
              <span className="text-sm sm:text-xl">
                {i18n.language === "ru" && t("contactModal.write_in")}{" "}
                <Link
                  to={
                    `${cargo?.username !== null && `https://t.me/${cargo?.username}`}` ||
                    ""
                  }
                  target="_blank"
                  className="text-[#659df2]"
                  onClick={() =>
                    dispatch(
                      updateCargoActions({
                        cargoId: cargo?.id || 0,
                        data: { chatted_telegram: true },
                      })
                    )
                  }
                >
                  Telegram
                </Link>
                {i18n.language !== "ru" && ` ${t("contactModal.write_in")}`}
              </span>
            </div>
          )}
          {cargo?.whatsup && (
            <div className="flex items-center gap-x-4">
              <div>
                <FaWhatsappSquare className="text-xl sm:text-3xl text-[#34C759]" />
              </div>
              <span>
                {i18n.language === "ru" && t("contactModal.write_in")}{" "}
                <Link
                  to={`https://wa.me/${cargo?.whatsup}`}
                  target="_blank"
                  className="text-[#34C759]"
                  onClick={() =>
                    dispatch(
                      updateCargoActions({
                        cargoId: cargo?.id || 0,
                        data: { chatted_whatsup: true },
                      })
                    )
                  }
                >
                  WhatsApp
                </Link>
                {i18n.language !== "ru" && ` ${t("contactModal.write_in")}`}
              </span>
            </div>
          )}
          <div className="flex items-center gap-x-4">
            <div>
              <FaGlobe className="text-xl sm:text-3xl" />
            </div>
            <span className="text-sm sm:text-xl">
              {t("contactModal.source")}:{" "}
              <Link
                to={cargo?.source || "https://t.me/"}
                target="_blank"
                className="text-blue-500 underline"
              >
                {cargo?.source}
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            <div>
              <FaShareSquare className="text-xl sm:text-3xl" />
            </div>
            <a
              href={`https://t.me/share/url?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                dispatch(
                  updateCargoActions({
                    cargoId: cargo?.id || 0,
                    data: { shared: true },
                  })
                )
              }
              className="text-sm sm:text-xl"
            >
              {t("contactModal.share")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
