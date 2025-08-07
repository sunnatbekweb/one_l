import type { Cargos } from "./apiType";
import type { Cargo } from "./cargo";
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

export interface Bookmark {
  id: number;
  user: number;
  cargo: Cargo;
}

export interface bookmarkState {
  bookmarks: Bookmark[];
  isloading: boolean;
  error: string | null;
}
