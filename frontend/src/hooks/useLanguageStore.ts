import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import text from "../assets/text";
import { viewMode } from "./getUrlParams";

export type Language = "en" | "no";

const defaultLanguage: Language = viewMode === "embedded" ? "no" : "en";
const languageStoreKey = viewMode === "embedded" ? "language-store-embedded" : "language-store";

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;

  l: (entry: Record<Language, string> | undefined) => string | undefined,
}

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({

      language: defaultLanguage,

      setLanguage: (lang) => set({ language: lang }),

      l: (entry) => entry ? entry[get().language] : undefined,

    }),
    {
      name: languageStoreKey,
      partialize: (state) => ({
        language: state.language,
      }),
    }
  )
);

export default useLanguageStore;
export {text as t};


export function ordinal(n: number, language: Language): string {
  if (language === "no") {
    return `${n}.`;
  }

  const mod100 = n % 100;

  if (mod100 >= 11 && mod100 <= 13) {
    return `${n}th`;
  }

  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}