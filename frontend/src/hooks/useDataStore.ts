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

type Kommune = {
  name: string;
  [key: MetricKey]: number;
}

export type Year = string & { readonly __brand: unique symbol};
export type KommuneNr = string & { readonly __brand: unique symbol};

type Data = {
  [year: Year]: {
    [kommuneNr: KommuneNr]: Kommune;
  }
}


const sumInvertibleValues = (metrics: Metric[], kommune: Kommune): number => {
  return metrics.reduce((acc, metric) => acc + (metric.invert === true ? 100-kommune[metric.key] : kommune[metric.key]), 0)
}

interface DataStore {
  dataModel: DataModel | null;
  data: Data | null;
  fetchData: () => Promise<void>;

  selectedYear: Year | null;
  setSelectedYear: (year: Year) => void;

  highlightedKommune: KommuneNr | null;
  setHighlightedKommune: (kommune: KommuneNr | null) => void;
  
  selectedKommune: KommuneNr | null;
  setSelectedKommune: (kommune: KommuneNr | null) => void;

  getElementValue: (elementIndex: number, komNr?: KommuneNr) => number | null; // takes index of the element (hazard, vulnr, expo or resp) in the elements list

  getTotalRisk: (komNr?: KommuneNr) => number | null;
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

  getElementValue: (elementIndex, komNr?) => {
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
  },

  getTotalRisk: (komNr?) => {
    const { dataModel, data, selectedKommune, selectedYear, getElementValue } = get()
    if (!dataModel || !data || !selectedYear || (!komNr && !selectedKommune)) return null
    const elements = dataModel.elements
    return elements.reduce((acc, element) => {
      const elementValue = getElementValue(elements.indexOf(element), komNr) ?? 0;
      return acc + (element.invert === true ? 100 - elementValue : elementValue);
    }, 0);
  },

}));

export default useDataStore;