export interface Cargo {
  id: number;
  date: string;
  created_at: string;
  updated_at: string;
  source: string;
  origin: string;
  origin_country: string;
  destination: string;
  destination_country: string;
  km: number;
  price: number;
  phone: string;
  phoned: number;
  shared: number;
  chatted_telegram: number;
  chatted_whatsup: number;
  viewed: number;
  volume: number;
  weight: number;
  temperature: number;
  type: string;
  car_type: string;
  payment_type: string;
  username: string;
  whatsup: string | null;
  info: string;
}

export type CargoParams = {
  page?: number;
  type?: string;
  from_country?: string;
  to_country?: string;
  origin: string;
  destination: string;
  created_at?: string;
  date?: string;
  weight?: string;
  volume?: string;
};
