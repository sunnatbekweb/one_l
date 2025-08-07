import axios from "axios";

export const getStatistics = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/user/statistics/`
  );
  return response.data;
};
