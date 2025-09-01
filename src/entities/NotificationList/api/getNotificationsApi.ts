import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";

export const getNotifications = async () => {
  const response = await axios.get(
    `${baseUrl}/user/notifications/${localStorage.getItem("user_id")}/`
  );

  return response.data;
};
