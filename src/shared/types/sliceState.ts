import type { Cargos } from "./apiType";
import type { Statistics } from "./statisticsType";

export interface cargoState {
  cargos: Cargos;
  isloading: boolean;
  error: string | null;
}

export interface statisticsState {
  statistics: Statistics;
  isloading: boolean;
  error: string | null;
}
