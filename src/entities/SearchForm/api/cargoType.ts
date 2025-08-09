import type { CargoType } from "@/shared/types/apiType";
import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";

export const getCargoTypes = async () => {
  const response = await axios.get<CargoType[]>(`${baseUrl}/cargo-types/`);
  return response.data;
};
