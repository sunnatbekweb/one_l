import { parse, isValid, format, formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Форматирует дату из строки вида "30/07/2025 09:41" → "30.07 - 09:41"
 */
export function formatCustomDate(dateStr: string): string {
  const parsed = parse(dateStr, "dd/MM/yyyy HH:mm", new Date());
  return isValid(parsed) ? format(parsed, "dd.MM - HH:mm") : "Неизвестно";
}

/**
 * Возвращает относительное время: "3 дня назад"
 * Поддерживает дату вида "30/07/2025 09:41" или ISO-строку
 */
export function formatRelativeDate(dateStr: string): string {
  // Пытаемся сначала распарсить европейский формат
  let parsed = parse(dateStr, "dd/MM/yyyy HH:mm", new Date());

  if (!isValid(parsed)) {
    // Если не получилось — пробуем стандартный ISO-формат
    parsed = new Date(dateStr);
  }

  return isValid(parsed)
    ? formatDistanceToNow(parsed, { addSuffix: true, locale: ru })
    : "неизвестно";
}
