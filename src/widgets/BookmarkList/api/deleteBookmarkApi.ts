import axios from "axios";

export const deleteBookmark = async (id: number) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/user/favourite/${id}/`
  );
  return response.data;
};
