import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setLang } from "@/shared/lib/setLang";
import { SearchContainer } from "@/widgets/SearchBox";
import { Cargo } from "@/widgets/Cargo";
import { SearchInfo } from "@/widgets/SearchInfo";

export const Search = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(setLang());
  }, []);

  return (
    <>
      <SearchContainer />
      <Cargo />
      <SearchInfo />
    </>
  );
};
