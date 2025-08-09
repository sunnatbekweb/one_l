import type { Bookmark } from "@/shared/types/sliceState";
import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import Cookies from "js-cookie";
import axios from "axios";

export const getBookmarks = async () => {
  const response = await axios.get<Bookmark[]>(
    `${baseUrl}/user/favourites/${Cookies.get("user_id")}/`
  );
  return response.data;
};
