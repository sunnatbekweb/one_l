import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchCargoType } from "./model/cargoTypeSlice";
import { ValueExchangeButton } from "@/features/InputValueExchange/ui/ValueExchangeButton";
import { setFilters } from "@/features/filters/model/filterSlice";
import { Select } from "@/shared/ui/Select";
import { CountriesDropdown } from "@/shared/ui/Dropdown";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { fetchCountries } from "@/shared/model/resCountriesSlice.ts";
import type { Country } from "@/shared/types/apiType.ts";

interface FormValues {
	origin: string;
	destination: string;
	type: string;
}

export const SearchForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { type } = useSelector((state: RootState) => state.types);
	const { countries } = useSelector((state: RootState) => state.counties);

	const { register, handleSubmit, setValue, getValues } = useForm<FormValues>({
		defaultValues: { origin: "", destination: "", type: "" }
	});

	const { t } = useTranslation();

	// Отдельный стейт для каждого инпута
	const [originValue, setOriginValue] = useState("");
	const [originCountry, setOriginCountry] = useState<Country | null>(null);

	const [destinationValue, setDestinationValue] = useState("");
	const [destinationCountry, setDestinationCountry] = useState<Country | null>(
		null
	);

	const onSubmit = (data: FormValues) => {
		dispatch(setFilters(data));
	};

	const valueChange = () => {
		// Меняем текстовые значения в форме
		const currentOrigin = getValues("origin");
		const currentDestination = getValues("destination");
		setValue("origin", currentDestination);
		setValue("destination", currentOrigin);

		// Меняем стейт текстовых значений
		setOriginValue(currentDestination);
		setDestinationValue(currentOrigin);

		// Меняем выбранные страны (чтобы флаги поменялись)
		const tempCountry = originCountry;
		setOriginCountry(destinationCountry);
		setDestinationCountry(tempCountry);
	};

	useEffect(() => {
		dispatch(fetchCargoType());
		dispatch(fetchCountries());
	}, [dispatch]);

	return (
		<form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="relative flex flex-col gap-y-4">
				{/* Origin */}
				<CountriesDropdown
					type="text"
					placeholder={t("form.from")}
					icon={<FaLocationDot />}
					countries={countries}
					value={originValue}
					selectedCountry={originCountry}
					onChange={val => {
						setOriginValue(val);
						setOriginCountry(null); // сбрасываем флаг при ручном вводе
						setValue("origin", val);
					}}
					onSelect={country => {
						setOriginCountry(country);
						setOriginValue(country.name.common);
						setValue("origin", country.name.common);
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
					onChange={val => {
						setDestinationValue(val);
						setDestinationCountry(null);
						setValue("destination", val);
					}}
					onSelect={country => {
						setDestinationCountry(country);
						setDestinationValue(country.name.common);
						setValue("destination", country.name.common);
					}}
				/>
			</div>

			<Select
				defaultValue="Тип транспорта"
				icon={<FaTruck />}
				types={type}
				{...register("type")}
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
