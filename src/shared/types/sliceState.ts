import type { Statistics } from "./statisticsType";

export interface statisticsState {
  statistics: Statistics;
  isloading: boolean;
  error: string | null;
}
