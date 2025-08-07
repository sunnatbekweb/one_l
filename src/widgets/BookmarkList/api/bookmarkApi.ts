import axios from "axios";
import Cookies from "js-cookie";
import type { Bookmark } from "@/shared/types/sliceState";

export const getBookmarks = async () => {
  const response = await axios.get<Bookmark[]>(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/ru/api/v1/user/favourites/${Cookies.get("user_id")}/`
  );
  return response.data;
};
