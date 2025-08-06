import { useTranslation } from "react-i18next";
import flag_ru from "../../../assets/icons/flag_ru.svg";
import flag_uz from "../../../assets/icons/flag_uz.svg";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LangDropdown: React.FC<DropdownProps> = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      className={`absolute top-[70%] left-1/2 -translate-x-1/2 overflow-hidden ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } transition-all duration-300 w-16 bg-white text-black border border-gray-500 rounded p-1 shadow-xl`}
    >
      <button
        onClick={() => handleLanguageChange("ru")}
        className="flex items-center gap-x-2 py-0.5 w-full"
      >
        <div className="w-2/5">
          <img src={flag_ru} alt="Flag RU" className="w-full object-cover" />
        </div>
        <span
          className={`font-medium text-sm ${
            i18n.language === "ru" && "text-[#041e90]"
          }`}
        >
          RU
        </span>
      </button>
      <button
        onClick={() => handleLanguageChange("uz-Latn")}
        className="flex items-center gap-x-2 py-0.5 w-full"
      >
        <div className="w-2/5">
          <img src={flag_uz} alt="Flag UZ" className="w-full object-cover" />
        </div>
        <span
          className={`font-medium text-sm ${
            i18n.language === "uz-Latn" && "text-[#041e90]"
          }`}
        >
          UZ
        </span>
      </button>
      <button
        onClick={() => handleLanguageChange("uz-Cyrl")}
        className="flex items-center gap-x-2 py-0.5 w-full"
      >
        <div className="w-2/5">
          <img
            src={flag_uz}
            alt="Flag UZ Cyr"
            className="w-full object-cover"
          />
        </div>
        <span
          className={`font-medium text-sm ${
            i18n.language === "uz-Cyrl" && "text-[#041e90]"
          }`}
        >
          УЗ
        </span>
      </button>
    </div>
  );
};
