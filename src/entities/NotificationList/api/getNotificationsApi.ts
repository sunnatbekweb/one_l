import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";
import Cookies from "js-cookie";

export const getNotifications = async () => {
  const response = await axios.get(
    `${baseUrl}/user/notifications/${Cookies.get("user_id")}/`
  );

  return response.data;
};
