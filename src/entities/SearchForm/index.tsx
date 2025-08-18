import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { ValueExchangeButton } from "@/features/InputValueExchange/ui/ValueExchangeButton";
import { setFilters } from "@/features/filters/model/filterSlice";
import { Select } from "@/shared/ui/Select";
import { CountriesDropdown } from "@/shared/ui/Dropdown";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { fetchCountries } from "@/shared/model/restCountriesSlice.ts";
import type { Country } from "@/shared/types/apiType.ts";
import { fetchTransportType } from "./model/transportTypeSlice";

export const SearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { car_type } = useSelector((state: RootState) => state.transportType);
  const { countries } = useSelector((state: RootState) => state.counties);

  const { t } = useTranslation();

  // Локальные состояния
  const [originValue, setOriginValue] = useState("");
  const [originCountry, setOriginCountry] = useState<Country | null>(null);

  const [destinationValue, setDestinationValue] = useState("");
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
    // Меняем значения
    setOriginValue(destinationValue);
    setDestinationValue(originValue);

    // Меняем выбранные страны
    const tempCountry = originCountry;
    setOriginCountry(destinationCountry);
    setDestinationCountry(tempCountry);
  };

  useEffect(() => {
    dispatch(fetchTransportType());
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
      <div className="relative flex flex-col gap-y-4">
        {/* Origin */}
        <CountriesDropdown
          type="text"
          placeholder={t("form.from")}
          icon={<FaLocationDot />}
          countries={countries}
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
          countries={countries}
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
        car_type={car_type}
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
