import { useTranslation } from "react-i18next";
import { Slider } from "../Input/Slider";
import { FaBox, FaCheckCircle } from "react-icons/fa";
import { TbCoinEuroFilled } from "react-icons/tb";
import "./modal.css";

interface ModalProps {
  modal: boolean;
  close: () => void;
}

export const SearchFilter: React.FC<ModalProps> = ({ modal, close }) => {
  const { t } = useTranslation();
  return (
    <div onClick={close} className={`modal ${modal ? "open" : ""}`}>
      <div onClick={(e) => e.stopPropagation()} className="modal_content">
        <h2 className="font-bold text-xl">{t("form.filtersTitle")}</h2>
        <p className="text-base sm:text-lg py-2.5">{t("form.filtersSubtitle")}</p>
        <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:px-6 mt-4 sm:mt-8 mb-2">
          <div>
            <div className="flex items-center justify-between py-5 border-b border-gray-200">
              <div className="flex items-center gap-x-2.5 sm:gap-x-5">
                <div className="relative w-fit">
                  <FaBox className="text-xl text-blue-500" />
                  <div className="absolute bottom-[-10%] right-[-10%] z-[1]">
                    <FaCheckCircle className="text-sm text-blue-300" />
                  </div>
                </div>
                <span className="font-semibold text-sm sm:text-base text-blue-900">
                  {t("form.filterOption1")}
                </span>
              </div>
              <Slider />
            </div>
            <div className="flex items-center justify-between py-5 border-b border-gray-200">
              <div className="flex items-center gap-x-2.5 sm:gap-x-5">
                <div className="relative w-fit">
                  <img
                    src="https://img.icons8.com/?size=512&id=2sZ0sdlG9kWP&format=png"
                    alt="image-icon"
                    className="min-w-6 h-6 sm:w-6 sm:h-6"
                  />
                </div>
                <span className="font-semibold text-sm sm:text-base text-blue-900">
                  {t("form.filterOption2")}
                </span>
              </div>
              <Slider />
            </div>
            <div className="flex flex-col gap-y-5 py-5 border-b border-gray-200">
              <div className="flex items-center gap-x-2.5 sm:gap-x-5">
                <div className="relative w-fit">
                  <TbCoinEuroFilled className="text-2xl text-amber-500" />
                </div>
                <span className="font-semibold text-sm sm:text-base text-blue-900">
                  {t("form.filterOption3")}
                </span>
              </div>
              <div>
                <button className="p-1 mx-1 rounded-sm bg-gray-100 font-semibold text-sm sm:text-base text-cyan-700">
                  {t("form.filterOption3_1")}
                </button>
                <button className="p-1 mx-1 rounded-sm bg-gray-100 font-semibold text-sm sm:text-base text-cyan-700">
                  {t("form.filterOption3_2")}
                </button>
                <button className="p-1 mx-1 rounded-sm bg-gray-100 font-semibold text-sm sm:text-base text-cyan-700">
                  {t("form.filterOption3_3")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="button_long">{t("form.find")}</button>
      </div>
    </div>
  );
};
