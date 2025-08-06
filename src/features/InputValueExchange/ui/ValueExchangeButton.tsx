import { FaUpLong } from "react-icons/fa6";

export const ValueExchangeButton = ({valueChange} : {valueChange: () => void}) => {
  return (
    <button type="button" onClick={valueChange} className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border-2 border-[#8e8d8d] rounded-full flex items-center justify-center">
      <FaUpLong className="w-2.5 font-bold text-lg text-gray-500" />
      <FaUpLong className="rotate-180 w-2.5 font-bold text-lg text-gray-500" />
    </button>
  );
};
