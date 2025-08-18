export function shareToTelegram(fullMessage: string) {
  const tgLink = `https://t.me/share/url?text=${encodeURIComponent(fullMessage)}`;
  window.open(tgLink, "_blank");
}
