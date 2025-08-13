import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLang } from "@/shared/lib/setLang";
import Cookies from "js-cookie";
import styles from "./loader.module.css";

export const Welcome = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // iOS aniqlash funksiyasi
  const isIOS = () => {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  useEffect(() => {
    i18n.changeLanguage(setLang());

    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      tg.ready();

      if (!isIOS()) {
        // Faqat Android yoki boshqa platformalarda avtomatik kengaytirish
        tg.expand();
      } else {
        // iOS’da foydalanuvchi interaction bo‘lishi kerak
        const onTap = () => {
          tg.expand();
          document.removeEventListener("click", onTap); // Bir marta ishlaydi
        };
        document.addEventListener("click", onTap);
      }
    }

    if (params.id && params.lang) {
      Cookies.set("user_id", params.id ?? "");
      Cookies.set("lang", params.lang ?? "ru");

      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main
      className={`${styles.welcome} welcome h-screen grid place-content-center`}
    >
      <div className="flex items-center gap-x-5">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%]">
          <span className={styles.loader}></span>
        </div>
      </div>
    </main>
  );
};
