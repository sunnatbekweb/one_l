import flag_ru from "../../../assets/icons/flag_ru.svg";
import flag_uz from "../../../assets/icons/flag_uz.svg";

export const LangDropdown = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-16 bg-white text-black border border-gray-500 rounded p-1 shadow-xl">
      <button className="flex items-center gap-x-2 py-0.5">
        <div className="w-2/5 border-spacing-0.5 border-gray-300">
          <img src={flag_ru} alt="Flag" className="w-full object-cover" />
        </div>
        <span className="font-medium text-sm">RU</span>
      </button>
      <button className="flex items-center gap-x-2 py-0.5">
        <div className="w-2/5 border-spacing-0.5 border-gray-300">
          <img src={flag_uz} alt="Flag" className="w-full object-cover" />
        </div>
        <span className="font-medium text-sm">UZ</span>
      </button>
      <button className="flex items-center gap-x-2 py-0.5">
        <div className="w-2/5 border-spacing-0.5 border-gray-300">
          <img src={flag_uz} alt="Flag" className="w-full object-cover" />
        </div>
        <span className="font-medium text-sm">УЗ</span>
      </button>
    </div>
  );
};
