import type { Cargos } from "./apiType";

export interface cargoState {
  cargos: Cargos;
  isloading: boolean;
  error: string | null;
}
