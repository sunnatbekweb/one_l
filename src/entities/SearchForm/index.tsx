import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchCargoType } from "./model/cargoTypeSlice";
import { ValueExchangeButton } from "@/features/InputValueExchange/ui/ValueExchangeButton";
import { setFilters } from "@/features/filters/model/filterSlice";
import { Select } from "@/shared/ui/select";
import { InputPrimary } from "@/shared/ui/Input";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface FormValues {
  origin: string;
  destination: string;
  type: string;
}

export const SearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { type } = useSelector((state: RootState) => state.types);
  const { register, handleSubmit, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      origin: "",
      destination: "",
      type: "",
    },
  });

  const { t } = useTranslation();

  const onSubmit = (data: FormValues) => {
    dispatch(setFilters(data));
  };

  const valueChange = () => {
    const currentOrigin = getValues("origin");
    const currentDestination = getValues("destination");
    setValue("origin", currentDestination);
    setValue("destination", currentOrigin);
  };

  useEffect(() => {
    dispatch(fetchCargoType());
  }, [dispatch]);

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex flex-col gap-y-4">
        <InputPrimary
          type="text"
          placeholder={t("form.from")}
          icon={<FaLocationDot />}
          {...register("origin")}
        />
        <ValueExchangeButton valueChange={valueChange} />
        <InputPrimary
          type="text"
          placeholder={t("form.to")}
          icon={<FaLocationDot />}
          {...register("destination")}
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
