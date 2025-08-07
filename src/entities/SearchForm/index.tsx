import { useForm } from "react-hook-form";
import { InputPrimary } from "@/shared/ui/Input";
import { FaLocationDot } from "react-icons/fa6";
import { Select } from "@/shared/ui/select";
import { FaTruck } from "react-icons/fa";
import { ValueExchangeButton } from "@/features/InputValueExchange/ui/ValueExchangeButton";
import { useTranslation } from "react-i18next";

interface FormValues {
  origin: string;
  destination: string;
  transport_type: string;
}

export const SearchForm = () => {
  const { register, handleSubmit, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      origin: "",
      destination: "",
      transport_type: "",
    },
  });

  const { t } = useTranslation("");

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  const valueChange = () => {
    const currentOrigin = getValues("origin");
    const currentDestination = getValues("destination");
    setValue("origin", currentDestination);
    setValue("destination", currentOrigin);
  };

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
        {...register("transport_type")}
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
