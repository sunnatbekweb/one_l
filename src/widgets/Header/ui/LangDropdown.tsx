import React from "react";
import { useTranslation } from "react-i18next";
import flag_ru from "../../../assets/icons/flag_ru.svg";
import flag_uz from "../../../assets/icons/flag_uz.svg";
import Cookies from "js-cookie";

interface DropdownProps {
	isOpen: boolean;
	onClose: () => void;
}

export const LangDropdown: React.FC<DropdownProps> = ({ isOpen, onClose }) => {
	const { i18n } = useTranslation();

	const handleLanguageChange = (lng: string) => {
		let code = "0";
		if (lng === "uz-Latn") code = "1";
		if (lng === "uz-Cyrl") code = "2";

		Cookies.set("lang", code);
		i18n.changeLanguage(lng);
		onClose();
	};

	return (
		<div
			onMouseLeave={onClose}
			className={`absolute top-[70%] left-1/2 -translate-x-1/2 overflow-hidden ${
				isOpen ? "visible opacity-100" : "invisible opacity-0"
			} transition-all duration-300 w-16 bg-white border border-gray-500 rounded p-1 shadow-xl`}
		>
			<button
				onClick={() => handleLanguageChange("ru")}
				className="flex items-center gap-x-2 py-0.5 w-full"
			>
				<div className="w-2/5">
					<img src={flag_ru} alt="Flag RU" className="w-full object-cover" />
				</div>
				<span
					className={`font-semibold text-sm ${
						i18n.language === "ru" ? "text-blue-900" : "text-gray-600"
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
					className={`font-semibold text-sm ${
						i18n.language === "uz-Latn" ? "text-[#041e90]" : "text-gray-600"
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
					className={`font-semibold text-sm ${
						i18n.language === "uz-Cyrl" ? "text-[#041e90]" : "text-gray-600"
					}`}
				>
					УЗ
				</span>
			</button>
		</div>
	);
};
