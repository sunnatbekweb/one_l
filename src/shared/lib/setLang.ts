import Cookies from "js-cookie";

export function setLang(langFromParams?: string) {
  switch (langFromParams ?? Cookies.get("lang")) {
    case "0":
      return "ru";
    case "1":
      return "uz-Latn";
    case "2":
      return "uz-Cyrl";
    default:
      return "ru";
  }
}
