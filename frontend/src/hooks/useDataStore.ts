import { create } from 'zustand';
import { getPublicUrl } from './getPublicUrl';

type Metric = {
  name: string; 
  value: number;
  invert?: boolean;
}

type Element = {
  name: string;
  value: number;
  invert?: boolean
  metrics: Metric[];
}

type Kommune = { 
  name: string; 
  sumMetric: Metric;
  elements: Element[];
};

export type Year = string & { readonly __brand: unique symbol};
export type KommuneNr = string & { readonly __brand: unique symbol};

type RiskData = {
  [year: Year]: {
    [kommuneNr: KommuneNr]: Kommune
  }
}

type InvertibleValue = {
  value: number;
  invert?: boolean
}

const sumInvertibleValues = (items: InvertibleValue[]): number => {
  return items.reduce((acc, val) => acc + (val.invert === true ? 100-val.value : val.value), 0)
}

interface DataStore {
  data: RiskData | null;
  fetchData: () => Promise<void>;

  selectedYear: Year | null;
  setSelectedYear: (year: Year) => void;

  highlightedKommune: KommuneNr | null;
  setHighlightedKommune: (kommune: KommuneNr | null) => void;
  
  selectedKommune: KommuneNr | null;
  setSelectedKommune: (kommune: KommuneNr | null) => void;

  getTotalRisk: () => number | null;

  getElementTotal: (elementIndex: number) => number | null; // takes index of the element (hazard, vulnr, expo or resp) in the elements list
}

const useDataStore = create<DataStore>((set, get) => ({
  
  data: null,
  
  fetchData: async () => {
    const res = await fetch(getPublicUrl('/data/kommune_data.json'));
    const data: RiskData = await res.json();
    const selectedYear = Object.keys(data)[0] as Year // TODO: Make default year property in kommune_data_model.json?
    set({ data, selectedYear });
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

  getTotalRisk: () => {
    const { data, selectedKommune, selectedYear } = get()
    if (!data || !selectedKommune || !selectedYear) return null
    const elements = data[selectedYear][selectedKommune].elements
    return sumInvertibleValues(elements)
  },

  getElementTotal: (elementIndex) => {
    const { data, selectedKommune, selectedYear } = get()
    if (!data || !selectedKommune || !selectedYear) return null
    const metrics = data[selectedYear][selectedKommune].elements[elementIndex].metrics

    const tmpRes = sumInvertibleValues(metrics)
    let min = Infinity
    let max = -Infinity
    for (const year of Object.values(data)) {
      for (const kom of Object.values(year)) {
        const calculatedRisk = sumInvertibleValues(kom.elements[elementIndex].metrics)
        if (calculatedRisk < min) {
          min = calculatedRisk
        }
        if (calculatedRisk > max) {
          max = calculatedRisk
        }
      }
    }
    
    if (min === max) return null
    return (tmpRes - min)/(max - min)*100
  }

}));

export default useDataStore;