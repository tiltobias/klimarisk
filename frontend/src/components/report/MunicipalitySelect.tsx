import useDataStore, { type KommuneNr } from "../../hooks/useDataStore";
import useLanguageStore, { t } from "../../hooks/useLanguageStore";

function MunicipalitySelect() {
  const {
    data,
    selectedYear,
    selectedKommune,
    setSelectedKommune,
  } = useDataStore();
  const { l } = useLanguageStore();

  const municipalities =
    data && selectedYear
      ? Object.entries(data.years[selectedYear]?.byKommune ?? {})
      : [];

  const municipalitiesSorted = [...municipalities].sort((a, b) => {
      const aValue: string = a[1]["klimarisk_name"];
      const bValue: string = b[1]["klimarisk_name"];

      if (aValue === bValue) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });

  return (
    <div className="distSelect">
      <select
        value={selectedKommune ?? ""}
        onChange={(event) =>
          setSelectedKommune(event.target.value as KommuneNr)
        }
      >
        <option value="" disabled>
          {l(t.report.selectMunicipality)}
        </option>

        {municipalitiesSorted.map(([kommuneNr, kommune]) => (
          <option
            key={kommuneNr}
            value={kommuneNr}
          >
            {kommune.klimarisk_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MunicipalitySelect;