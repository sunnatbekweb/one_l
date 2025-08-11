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

export type Country = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [langCode: string]: {
        official: string;
        common: string;
      };
    };
  };
};
