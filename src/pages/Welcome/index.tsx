import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLang } from "@/shared/lib/setLang";
import Cookies from "js-cookie";
import styles from "./style.module.css";

export const Welcome = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    sessionStorage.setItem("viewMode", "popular");

    if (params.id && params.lang) {
      Cookies.set("user_id", params.id ?? "");
      Cookies.set("lang", params.lang ?? "ru");
    }

    i18n.changeLanguage(setLang());

    if (params.id && params.lang) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [params.id, params.lang, i18n, navigate]);

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
