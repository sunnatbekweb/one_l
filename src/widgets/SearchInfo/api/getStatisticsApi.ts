import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";

export const getStatistics = async () => {
  const response = await axios.get(`${baseUrl}/user/statistics/`);
  return response.data;
};
