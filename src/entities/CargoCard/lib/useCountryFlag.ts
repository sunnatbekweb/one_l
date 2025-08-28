import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export const useCountryFlag = (countryCode: string) => {
  const { countries } = useSelector((state: RootState) => state.counties);

  const flag = useMemo(() => {
    const country = countries.find((c) => c.cca2 === countryCode);
    return country?.flags?.png || null;
  }, [countries, countryCode]);

  return { flag };
};
