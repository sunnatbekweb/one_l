import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ValueExchangeButton } from "@/features/InputValueExchange/ui/ValueExchangeButton";
import { setFilters } from "@/features/filters/model/filterSlice";
import { useGetCountriesQuery } from "@/app/countriesApi";
import { Select } from "@/shared/ui/Select";
import { CountriesDropdown } from "@/shared/ui/Dropdown";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import type { AppDispatch } from "@/app/store";
import type { Country } from "@/shared/types/apiType.ts";

export const SearchForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data: countries } = useGetCountriesQuery();
  const [originValue, setOriginValue] = useState("");
  const [destinationValue, setDestinationValue] = useState("");
  const [originCountry, setOriginCountry] = useState<Country | null>(null);
  const [destinationCountry, setDestinationCountry] = useState<Country | null>(
    null
  );
  const [carTypeValue, setCarTypeValue] = useState("all");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      from_country: originCountry ? originCountry.name.common : "",
      to_country: destinationCountry ? destinationCountry.name.common : "",
      origin: !originCountry && originValue ? originValue : "",
      destination:
        !destinationCountry && destinationValue ? destinationValue : "",
      car_type: carTypeValue,
    };

    dispatch(setFilters(payload));
    sessionStorage.setItem("viewMode", "search");
  };

  const valueChange = () => {
    setOriginValue(destinationValue);
    setDestinationValue(originValue);

    const tempCountry = originCountry;
    setOriginCountry(destinationCountry);
    setDestinationCountry(tempCountry);
  };

  return (
    <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
      <div className="relative flex flex-col gap-y-4">
        {/* Origin */}
        <CountriesDropdown
          type="text"
          placeholder={t("form.from")}
          icon={<FaLocationDot />}
          countries={countries || []}
          value={originValue}
          selectedCountry={originCountry}
          fromAnywhere={t("fromAnywhere")}
          onChange={(val) => {
            setOriginValue(val);
            setOriginCountry(null);
          }}
          onSelect={(country) => {
            setOriginCountry(country);
            setOriginValue(country.name.common);
          }}
        />
        <ValueExchangeButton valueChange={valueChange} />
        {/* Destination */}
        <CountriesDropdown
          type="text"
          placeholder={t("form.to")}
          icon={<FaLocationDot />}
          countries={countries || []}
          value={destinationValue}
          selectedCountry={destinationCountry}
          anywhere={t("anywhere")}
          onChange={(val) => {
            setDestinationValue(val);
            setDestinationCountry(null);
          }}
          onSelect={(country) => {
            setDestinationCountry(country);
            setDestinationValue(country.name.common);
          }}
        />
      </div>
      <Select
        defaultValue="Тип транспорта"
        icon={<FaTruck />}
        value={carTypeValue}
        onChange={(e) => setCarTypeValue(e.target.value)}
      />
      <button
        type="submit"
        className="mt-4 px-5 py-3.5 rounded-lg bg-[#ffa94d] hover:bg-[#ff922b] text-white text-xl font-semibold cursor-pointer duration-300"
      >
        {t("form.search")}
      </button>
    </form>
  );
};
