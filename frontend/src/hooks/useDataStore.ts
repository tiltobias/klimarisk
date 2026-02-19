import { create } from 'zustand';
import { getPublicUrl } from './getPublicUrl';

type MetricKey = string & { readonly __brand: unique symbol};

type Metric = {
  name: string; 
  key: MetricKey;
  invert?: boolean;
}

type Element = {
  name: string;
  invert?: boolean;
  metrics: Metric[];
}

type DataModel = { 
  elements: Element[];
};

type KommuneData = {
  name: string;
  [key: MetricKey]: number;
}

export type Year = string & { readonly __brand: unique symbol};
export type KommuneNr = string & { readonly __brand: unique symbol};

type Data = {
  [year: Year]: {
    [kommuneNr: KommuneNr]: KommuneData;
  }
}

type KommuneCache = {
  [elementIndex: number]: number;
  totalRisk: number;
}

type Cache = {
  [year: Year]: {
    [kommuneNr: KommuneNr]: KommuneCache;
  }
  minRisk: number;
  maxRisk: number;
}


const sumInvertibleValues = (metrics: Metric[], kommune: KommuneData): number => {
  return metrics.reduce((acc, metric) => acc + (metric.invert === true ? 100-kommune[metric.key] : kommune[metric.key]), 0)
}

interface DataStore {
  dataModel: DataModel | null;
  data: Data | null;
  fetchData: () => Promise<void>;

  cache: Cache | null;
  refreshCache: () => void;
  calculateElementValue: (elementIndex: number, komNr?: KommuneNr) => number | null; // takes index of the element (hazard, vulnr, expo or resp) in the elements list

  getElementValue: (elementIndex: number, komNr?: KommuneNr) => number | null; // takes index of the element (hazard, vulnr, expo or resp) in the elements list
  getTotalRisk: (komNr?: KommuneNr) => number | null;

  getRiskColor: (komNr?: KommuneNr) => string;


  selectedYear: Year | null;
  setSelectedYear: (year: Year) => void;

  highlightedKommune: KommuneNr | null;
  setHighlightedKommune: (kommune: KommuneNr | null) => void;
  
  selectedKommune: KommuneNr | null;
  setSelectedKommune: (kommune: KommuneNr | null) => void;
}

const useDataStore = create<DataStore>((set, get) => ({
  
  dataModel: null,
  
  data: null,
  
  fetchData: async () => {
    const dataRes = await fetch(getPublicUrl('/data/kommune_data.json'));
    const data: Data = await dataRes.json();
    
    const dataModelRes = await fetch(getPublicUrl('/data/kommune_data_model.json'));
    const dataModel: DataModel = await dataModelRes.json();

    const selectedYear = Object.keys(data)[0] as Year // TODO: Make default year property in kommune_data_model.json?
    set({ dataModel, data, selectedYear });

    get().refreshCache();
  },

  cache: null,

  refreshCache: () => {
    const { dataModel, data } = get();
    if (!dataModel || !data) return;

    const cache: Cache = {
      minRisk: Infinity,
      maxRisk: -Infinity,
    } as Cache;

    for (const year of Object.keys(data)) {
      cache[year as Year] = {};
      for (const komNr of Object.keys(data[year as Year])) {
        const kommuneCache: KommuneCache = { totalRisk: 0 };
        
        let totalRisk = 0;
        for (let i = 0; i < dataModel.elements.length; i++) {
          const elementValue = get().calculateElementValue(i, komNr as KommuneNr);
          if (elementValue !== null) {
            kommuneCache[i] = elementValue;
            totalRisk += dataModel.elements[i].invert === true ? 100 - elementValue : elementValue;
          }
        }
        kommuneCache.totalRisk = totalRisk;
        if (totalRisk < cache.minRisk) cache.minRisk = totalRisk;
        if (totalRisk > cache.maxRisk) cache.maxRisk = totalRisk;

        cache[year as Year][komNr as KommuneNr] = kommuneCache;
      }
    }
    set({ cache });
  },

  calculateElementValue: (elementIndex, komNr?) => {
    const { dataModel, data, selectedKommune, selectedYear } = get()
    if (!dataModel || !data || !selectedYear || (!komNr && !selectedKommune)) return null

    const metrics = dataModel.elements[elementIndex].metrics
    const kommune = data[selectedYear][komNr ?? selectedKommune!]

    const tmpRes = sumInvertibleValues(metrics, kommune)
    let min = Infinity
    let max = -Infinity
    for (const year of Object.values(data)) {
      for (const kom of Object.values(year)) {
        const calculatedRisk = sumInvertibleValues(metrics, kom)
        if (calculatedRisk < min) min = calculatedRisk;
        if (calculatedRisk > max) max = calculatedRisk;
      }
    }
    
    if (min === max) return null
    return (tmpRes - min)/(max - min)*100
  },

  getElementValue: (elementIndex, komNr?) => {
    const { cache, selectedKommune, selectedYear } = get()
    if (!cache || !selectedYear || (!komNr && !selectedKommune)) return null
    return cache[selectedYear][komNr ?? selectedKommune!][elementIndex]
  },

  getTotalRisk: (komNr?) => {
    const { cache, selectedKommune, selectedYear } = get()
    if (!cache || !selectedYear || (!komNr && !selectedKommune)) return null
    return cache[selectedYear][komNr ?? selectedKommune!].totalRisk
  },

  getRiskColor: (komNr) => {
    const risk = get().getTotalRisk(komNr);
    const { cache } = get();
    if (risk === null || !cache) return 'gray';
    const { minRisk, maxRisk } = cache;
    if (risk < minRisk + (maxRisk - minRisk) * 0.25) return 'green';
    if (risk < minRisk + (maxRisk - minRisk) * 0.5) return 'yellow';
    if (risk < minRisk + (maxRisk - minRisk) * 0.75) return 'orange';
    return 'red';
  },


  selectedYear: null,

  setSelectedYear: (year) => set({ selectedYear: year }),

  highlightedKommune: null,
  
  setHighlightedKommune: (kommune) => set({ highlightedKommune: kommune }), 
  
  selectedKommune: null,
  
  setSelectedKommune: (kommune) => set((state) => {
    if (state.selectedKommune === kommune) {
      return { selectedKommune: null };
    }
    return { selectedKommune: kommune };
  }),

}));

export default useDataStore;