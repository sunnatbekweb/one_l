import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import type { CargoType } from "@/shared/types/apiType";
import axios from "axios";

export const getTransportType = async () => {
  const response = await axios.get<CargoType[]>(`${baseUrl}/cargo-car-types/`);
  return response.data;
};
