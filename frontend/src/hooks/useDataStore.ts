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
}

const useDataStore = create<DataStore>((set) => ({
  
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

}));

export default useDataStore;