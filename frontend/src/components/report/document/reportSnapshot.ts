import type { KommuneNr, Year, ElementKey, MetricKey } from "../../../hooks/useDataStore";

import { type Language, t } from "../../../hooks/useLanguageStore";


type Metric = {
  key: MetricKey;
  name: Record<Language, string>; 
  description?: Record<Language, string>;
  url?: string;
  invert?: boolean;
  // disabled: boolean;

  color: string;
  value: number;
}

type Element = {
  key: ElementKey;
  name: Record<Language, string>;
  description?: Record<Language, string>;
  invert?: boolean;
  // disabled: boolean;
  metrics: Metric[];

  color: string;
  value: number;
}

type YearInfo = {
  key: Year;
  name: Record<Language, string>;
  description?: Record<Language, string>;
}

type ReportDataModel = { 
  elements: Element[];
  risk: {
    color: string;
    value: number;
  };
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