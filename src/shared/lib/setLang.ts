import Cookies from "js-cookie";

export function setLang() {
  switch (Cookies.get("lang")) {
    case "0":
      return "ru";
      break;
    case "1":
      return "uz-Latn";
      break;
    case "2":
      return "uz-Cyrl";
      break;
    default:
      return "ru";
  }
}
