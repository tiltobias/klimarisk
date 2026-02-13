import { create } from 'zustand';
import { getPublicUrl } from './getPublicUrl';


type KommuneData = Record<string, { 
  Navn: string; 
  sumMetric: { 
    name: string;
    value: number 
  };
  elements: Array<{ 
    name: string; 
    value: number;
    metrics: Array<{ 
      name: string; 
      value: number 
    }>;
  }>;
}>;

interface DataStore {
  data: KommuneData | null;
  fetchData: () => Promise<void>;

  highlightedKommune: string | null;
  setHighlightedKommune: (kommune: string | null) => void;
  
  selectedKommune: string | null;
  setSelectedKommune: (kommune: string | null) => void;

  getTotalRisk: () => number;

  getElementTotal: (elementIndex: number) => number | null; // takes index of the element (hazard, vulnr, expo or resp) in the elements list
}

const useDataStore = create<DataStore>((set, get) => ({
  
  data: null,
  
  fetchData: async () => {
    const res = await fetch(getPublicUrl('/data/kommune_data.json'));
    const data: KommuneData = await res.json();
    set({ data });
  },

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
    const { data, selectedKommune } = get()
    if (!data || !selectedKommune) return -99999
    const elements = data[selectedKommune].elements
    return elements.reduce((acc, val) => acc + val.value, 0)
  },

  getElementTotal: (elementIndex) => {
    const { data, selectedKommune } = get()
    if (!data || !selectedKommune) return null
    const metrics = data[selectedKommune].elements[elementIndex].metrics

    const tmpRes = metrics.reduce((acc, val) => acc + val.value, 0)
    let min = Infinity
    let max = -Infinity
    for (const kom of Object.values(data)) {
      const calculatedRisk = kom.elements[elementIndex].metrics.reduce((acc, val) => acc + val.value, 0)
      if (calculatedRisk < min) {
        min = calculatedRisk
      }
      if (calculatedRisk > max) {
        max = calculatedRisk
      }
    }
    if (min === max) return null
    return (tmpRes - min)/(max - min)*100
  }

}));

export default useDataStore;