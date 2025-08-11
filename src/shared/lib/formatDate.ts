import {
  format,
  formatDistanceToNow,
  isValid,
  type Locale,
  parse,
} from "date-fns";
import { ru, uz, uzCyrl } from "date-fns/locale";
import i18n from "@/shared/config/i18n";

const localesMap: Record<string, Locale> = {
  ru,
  "uz-Latn": uz,
  "uz-Cyrl": uzCyrl,
};

function getLocale(): Locale {
  const locale = localesMap[i18n.language];
  return locale || ru;
}

export function formatCustomDate(dateStr: string): string | undefined {
  if (dateStr !== null) {
    const parsed = parse(dateStr, "dd/MM/yyyy HH:mm", new Date());
    return isValid(parsed)
      ? format(parsed, "dd.MM - HH:mm", { locale: getLocale() })
      : i18n.t("unknown");
  }
}

export function formatRelativeDate(dateStr: string): string {
  let parsed = parse(dateStr, "dd/MM/yyyy HH:mm", new Date());
  if (!isValid(parsed)) parsed = new Date(dateStr);

  return isValid(parsed)
    ? formatDistanceToNow(parsed, { addSuffix: true, locale: getLocale() })
    : i18n.t("unknown");
}
