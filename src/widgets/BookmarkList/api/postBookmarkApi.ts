import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";

interface FavouritePayload {
  user: number | undefined;
  cargo: number;
}

export const postBookmarkCargo = async (data: FavouritePayload) => {
  const response = await axios.post(`${baseUrl}/user/favourite/`, data);
  return response.data;
};
