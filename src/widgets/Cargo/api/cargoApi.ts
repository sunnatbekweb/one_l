import type { Cargo } from "@/shared/types/cargo";
import axios from "axios";

export interface Cargos {
  count: number;
  next: string | null;
  previous: string | null;
  results: Cargo[];
}

export const getCargos = async (page: number) => {
  const response = await axios.get<Cargos>(
    `${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/cargos/?page=${page}`
  );
  return response.data;
};
