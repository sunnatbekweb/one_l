import type { Cargo } from "./cargo";

export interface Cargos {
  count: number;
  next: string | null;
  previous: string | null;
  results: Cargo[];
}

export interface CargoType {
  type: string | number | undefined;
}


