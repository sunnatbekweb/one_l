import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLang } from "@/shared/lib/setLang";
import Cookies from "js-cookie";
import styles from "./loader.module.css";
import { useEffect } from "react";

export const Welcome = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(setLang());

    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      // iOS-da ba'zan kechikib yuklanadi, shuning uchun callback bilan ishlaymiz
      const initExpand = () => {
        tg.ready();
        setTimeout(() => {
          tg.expand();
        }, 50); // 50ms delay iOS uchun optimal
      };

      if (document.readyState === "complete") {
        initExpand();
      } else {
        window.addEventListener("load", initExpand);
        return () => window.removeEventListener("load", initExpand);
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
