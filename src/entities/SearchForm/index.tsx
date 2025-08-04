import { InputPrimary } from "@/shared/ui/Input";
import { FaLocationDot } from "react-icons/fa6";
import { Select } from "@/shared/ui/select";
import { FaTruck } from "react-icons/fa";
import { ExchangeButton } from "@/features/InputValueExchange/ui/ExchangeButton";

export const SearchForm = () => {
  return (
    <form className="flex flex-col gap-y-4">
      <div className="relative flex flex-col gap-y-4">
        <InputPrimary
          type="text"
          placeholder="Откуда"
          icon={<FaLocationDot />}
        />
        <ExchangeButton />
        <InputPrimary type="text" placeholder="Куда" icon={<FaLocationDot />} />
      </div>
      <Select
        name="transport_type"
        id="transport_type"
        defaultValue="Тип транспорта"
        icon={<FaTruck />}
      />
      <button className="mt-4 px-5 py-3.5 rounded-lg bg-[#ffa94d] hover:bg-[#ff922b] text-white text-xl font-semibold cursor-pointer duration-300">
        Поиск
      </button>
    </form>
  );
};
