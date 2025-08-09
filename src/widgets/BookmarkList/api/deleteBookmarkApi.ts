import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";

export const deleteBookmark = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/user/favourite/${id}/`);
  return response.data;
};
