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

  useEffect(() => {
    i18n.changeLanguage(setLang());

    if (params.id && params.lang) {
      Cookies.set("user_id", params.id ?? "");
      Cookies.set("lang", params.lang ?? "ru");

      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [params.id, params.lang, navigate]);

  return (
    <main className="main-container h-screen grid place-content-center">
      <div className="flex items-center gap-x-5">
        <div className="w-18 h-18">
          <img
            src="/favicon.ico"
            className="w-full h-full object-contain"
            alt="Logo icon"
          />
        </div>
        <h1 className="font-bold text-6xl italic">1LOG</h1>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%]">
          <span className={styles.loader}></span>
        </div>
      </div>
    </main>
  );
};
