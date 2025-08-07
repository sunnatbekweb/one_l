import type { Cargos } from "@/shared/types/apiType";
import axios from "axios";

export const getCargos = async (page: number) => {
  const response = await axios.get<Cargos>(
    `${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/cargos/?page=${page}`
  );
  return response.data;
};
