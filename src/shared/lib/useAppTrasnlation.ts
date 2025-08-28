import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useAppTrasnlation(ns?: string) {
  const { t, i18n } = useTranslation(ns);

  const translate = useMemo(() => {
    return (key: string, options?: any) => t(key, options);
  }, [t, i18n.language]);

  return { t, translate, i18n };
}
