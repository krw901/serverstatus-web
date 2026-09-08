export interface RawData {
  name: string;
  type: string;
  host: string;
  location: string;
  online4: boolean;
  online6: boolean;
  uptime: string;
  load: number;
  network_rx: number;
  network_tx: number;
  cpu: number;
  memory_total: number;
  memory_used: number;
  swap_total: number;
  swap_used: number;
  hdd_total: number;
  hdd_used: number;
  custom?: string;
}

export interface SergateData {
  servers?: Array<RawData>;
  updated?: string;
}
