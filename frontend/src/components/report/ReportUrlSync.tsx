import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDataStore, { type KommuneNr, type Year } from "../../hooks/useDataStore";
import useLanguageStore, { type Language } from "../../hooks/useLanguageStore";


function ReportUrlSync() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    selectedKommune,
    selectedYear,
    setSelectedKommune,
    setSelectedYear,
    data,
  } = useDataStore();
  const {
    language,
    setLanguage,
  } = useLanguageStore();

  // URL -> Zustand
  useEffect(() => {
    if (!data) return;

    const kommuneParam = searchParams.get("k");
    const yearParam = searchParams.get("y");
    const languageParam = searchParams.get("l");

    const validYear =
      yearParam && yearParam in data.years
        ? (yearParam as Year)
        : null;

    const validKommune =
      kommuneParam &&
      validYear &&
      kommuneParam in data.years[validYear].byKommune
        ? (kommuneParam as KommuneNr)
        : null;

    const validLanguage =
      languageParam === "no" || languageParam === "en"
        ? (languageParam as Language)
        : null;

    if (validKommune && validKommune !== selectedKommune) {
      setSelectedKommune(validKommune);
    }

    if (validYear && validYear !== selectedYear) {
      setSelectedYear(validYear);
    }

    if (validLanguage && validLanguage !== language) {
      setLanguage(validLanguage);
    }
  }, [
    searchParams,
    selectedKommune,
    selectedYear,
    language,
    setSelectedKommune,
    setSelectedYear,
    setLanguage,
    data,
  ]);

  // Zustand -> URL
  useEffect(() => {
    setSearchParams(currentParams => {
      const nextParams = new URLSearchParams(currentParams);

      if (selectedKommune) {
        nextParams.set("k", selectedKommune);
      } else {
        nextParams.delete("k");
      }

      if (selectedYear) {
        nextParams.set("y", selectedYear);
      } else {
        nextParams.delete("y");
      }

      nextParams.set("l", language);

      return nextParams;
    }, {
      replace: true,
    });
  }, [
    selectedKommune,
    selectedYear,
    language,
    setSearchParams,
  ]);

  return null;
}

export default ReportUrlSync;