import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import type { StationId } from "@/lib/world/stations";

export type WorldStrings = {
  tagline: string;
  start: string;
  skip: string;
  navLabel: string;
  close: string;
  overview: string;
};
export type WorldLabels = Record<StationId, string>;
export type WorldPanels = Record<StationId, ReactNode>;

export type WorldContent = { locale: Locale; t: WorldStrings; labels: WorldLabels; panels: WorldPanels };