export function shareToTelegram(text: string, url: string) {
  const userAgent = navigator.userAgent || navigator.vendor;

  // Если доступен Web Share API (Safari iOS, Chrome, Android)
  if (navigator.share) {
    navigator
      .share({
        title: "1LOG",
        text,
        url,
      })
      .catch((err) => console.log("Share canceled", err));
    return;
  }

  // Если iPhone/iPad (iOS Telegram почти всегда игнорит text при url)
  const isiOS = /iPad|iPhone|iPod/.test(userAgent);

  if (isiOS) {
    // Всё кладём в text
    const message = `${text}\n\n${url}`;
    const tgLink = `https://t.me/share/url?text=${encodeURIComponent(message)}`;
    window.open(tgLink, "_blank");
  } else {
    // Android / Desktop → можно разделять
    const tgLink = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    window.open(tgLink, "_blank");
  }
}
