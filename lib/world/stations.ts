export const STATION_IDS = ["about", "projects", "skills", "experience", "services", "contact"] as const;
export type StationId = (typeof STATION_IDS)[number];

export type Station = { id: StationId; lat: number; lon: number };

// Where each place sits on the planet, in degrees. lat 0 / lon 0 faces the camera.
export const STATIONS: Station[] = [
  { id: "about", lat: 20, lon: 0 },
  { id: "projects", lat: 30, lon: 65 },
  { id: "skills", lat: -20, lon: 130 },
  { id: "experience", lat: 25, lon: 200 },
  { id: "services", lat: -25, lon: 265 },
  { id: "contact", lat: 5, lon: 320 },
];

export const STATION_BY_ID = Object.fromEntries(STATIONS.map((s) => [s.id, s])) as Record<StationId, Station>;

export const isStationId = (v: string): v is StationId => (STATION_IDS as readonly string[]).includes(v);

// Same ids as the classic page sections, so old links like /en/#projects keep working.
export function stationFromHash(hash: string): StationId | null {
  const id = hash.replace(/^#/, "");
  return isStationId(id) ? id : null;
}

export function positionOf(lat: number, lon: number, radius: number): [number, number, number] {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [radius * Math.cos(la) * Math.sin(lo), radius * Math.sin(la), radius * Math.cos(la) * Math.cos(lo)];
}