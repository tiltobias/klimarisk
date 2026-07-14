import type { KommuneNr, Year, Data, Cache, ElementKey, MetricKey } from "../../../hooks/useDataStore";

import { type Language, t } from "../../../hooks/useLanguageStore";


type Metric = {
  key: MetricKey;
  name: Record<Language, string>; 
  description?: Record<Language, string>;
  color: string;
  invert?: boolean;
  // disabled: boolean;
}

type Element = {
  key: ElementKey;
  name: Record<Language, string>;
  description?: Record<Language, string>;
  color: string;
  invert?: boolean;
  // disabled: boolean;
  metrics: Metric[];
}

type YearInfo = {
  key: Year;
  name: Record<Language, string>;
  description?: Record<Language, string>;
}

type ReportDataModel = { 
  elements: Element[];
  years: YearInfo[];
  risk: {
    color: string;
  };
};


export interface ReportSnapshot {
  selectedKommune: KommuneNr,
  selectedYear: Year,

  dataModel: ReportDataModel,
  data: Data,
  cache: Cache,

  language: Language,
  l: (entry: Record<Language, string> | undefined) => string | undefined,
  t: typeof t,
}