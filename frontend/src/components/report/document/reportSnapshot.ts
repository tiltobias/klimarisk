import type { KommuneNr, Year, ElementKey, MetricKey } from "../../../hooks/useDataStore";

import { type Language, t } from "../../../hooks/useLanguageStore";

type StatValues = {
  color: string;
  value: number;
  rank: number;
  rankFylke: number;
}

type Metric = {
  key: MetricKey;
  name: Record<Language, string>; 
  description?: Record<Language, string>;
  url?: string;
  invert?: boolean;
  // disabled: boolean;

} & StatValues;

type Element = {
  key: ElementKey;
  name: Record<Language, string>;
  description?: Record<Language, string>;
  invert?: boolean;
  // disabled: boolean;
  metrics: Metric[];

} & StatValues;

type YearInfo = {
  key: Year;
  name: Record<Language, string>;
  description?: Record<Language, string>;
}

type ReportDataModel = { 
  elements: Element[];
  risk: StatValues;
  kommune: {
    key: KommuneNr;
    name: string;
  };
  year: YearInfo;
};


export type ReportSnapshot = 
  ReportDataModel 
  & {
    language: Language,
    l: (entry: Record<Language, string> | undefined) => string | undefined,
    t: typeof t,
  }