import type { Cargos } from "@/shared/types/apiType";
import type { CargoParams } from "@/shared/types/cargo";
import axios from "axios";

export const getCargos = async (params: CargoParams) => {
  const query = new URLSearchParams();

  if (params.page) query.append("page", params.page.toString());
  if (params.type) query.append("type", params.type);
  if (params.origin) query.append("origin", params.origin);
  if (params.destination) query.append("destination", params.destination);
  if (params.created_at) query.append("created_at", params.created_at);
  if (params.date) query.append("date", params.date);
  if (params.weight) query.append("weight", params.weight);
  if (params.volume) query.append("volume", params.volume);

  const response = await axios.get<Cargos>(
    `${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/cargos/?${query.toString()}`
  );
  return response.data;
};


export const getCargoById = async (id: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/ru/api/v1/cargo/${id}/`
  );

  return response.data;
};
