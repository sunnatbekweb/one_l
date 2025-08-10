import i18n from "../config/i18n";

export const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/${
  i18n.language === "ru" ? i18n.language : i18n.language.slice(0, 2)
}/api/v1`;
