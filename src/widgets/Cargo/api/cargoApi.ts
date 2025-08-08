// src/features/Cargo/api/cargoApi.ts
import type { Cargos } from "@/shared/types/apiType";
import axios from "axios";

export type CargoParams = {
  page?: number;
  type?: string;
  origin?: string;
  destination?: string;
};

export const getCargos = async (params: CargoParams) => {
  const query = new URLSearchParams();

  if (params.page) query.append("page", params.page.toString());
  if (params.type) query.append("type", params.type);
  if (params.origin) query.append("origin", params.origin);
  if (params.destination) query.append("destination", params.destination);

  const response = await axios.get<Cargos>(
    `${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/cargos/?${query.toString()}`
  );
  return response.data;
};
