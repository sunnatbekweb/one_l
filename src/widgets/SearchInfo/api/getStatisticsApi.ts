import { baseUrl } from "@/shared/lib/updatedBackendUrl.ts";
import axios from "axios";

export const getStatistics = async () => {
	const response = await axios.get(`${baseUrl}/user/statistics/`);
	return response.data;
};
