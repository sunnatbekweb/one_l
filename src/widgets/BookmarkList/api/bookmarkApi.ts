import type { Cargos } from "@/shared/types/apiType";
import axios from "axios";
import Cookies from "js-cookie";

export const getBookmarks = async () => {
  const response = await axios.get<Cargos>(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/ru/api/v1/user/favourites/${Cookies.get("user_id")}/`
  );
  return response.data;
};
