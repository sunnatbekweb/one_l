import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { WelcomePageContent } from "@/widgets/WelcomeContent";

export const Welcome = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id && params.lang) {
      Cookies.set("user_id", params.id ?? "");
      Cookies.set("lang", params.lang ?? "ru");

      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [params.id, params.lang, navigate]);

  return <WelcomePageContent />;
};
