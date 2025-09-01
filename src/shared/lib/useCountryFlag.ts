import { useMemo } from "react";
import { useGetCountriesQuery } from "@/app/countriesApi";

export const useCountryFlag = (countryCode: string) => {
  const { data: countries } = useGetCountriesQuery();

  const flag = useMemo(() => {
    const country = countries?.find((c) => c.cca2 === countryCode);
    return country?.flags?.png || null;
  }, [countries, countryCode]);

  return { flag };
};
