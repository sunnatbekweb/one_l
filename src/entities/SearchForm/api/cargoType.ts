import type { CargoType } from "@/shared/types/apiType";
import axios from "axios";

export const getCargoTypes = async () => {
  const response = await axios.get<CargoType[]>(
    `${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/cargo-types/`
  );
  return response.data;
};
