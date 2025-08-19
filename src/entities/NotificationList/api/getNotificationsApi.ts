import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";
import Cookies from "js-cookie";

export const getNotifications = async () => {
  const response = await axios.get(
    `${baseUrl}/user/notifications/${Cookies.get("user_id")}/`
  );

  const savedKeys = Object.keys(Cookies.get()).filter((key) =>
    key.startsWith("notify_")
  );

  if (!savedKeys.length) {
    return [];
  }

  const filtered = response.data.filter((item: any) => {
    const key = `notify_${item.origin}_${item.destination}`;
    return savedKeys.includes(key);
  });

  return filtered;
};
