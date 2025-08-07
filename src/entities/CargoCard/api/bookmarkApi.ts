import axios from "axios";

interface FavouritePayload {
  user: number | undefined;
  cargo: number;
}

export const postBookmarkCargo = async (data: FavouritePayload) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/user/favourite/`,
    data
  );
  return response.data;
};
