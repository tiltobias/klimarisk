import useDataStore, { type Year } from "../../hooks/useDataStore";
import useLanguageStore, { t } from "../../hooks/useLanguageStore";


function YearSelect() {
  const {
    selectedYear,
    setSelectedYear,
    dataModel,
  } = useDataStore();
  const { l } = useLanguageStore();

  if (!selectedYear) return null;

  return (
    <div className="distSelect">
      <select
        value={selectedYear ?? ""}
        onChange={(event) =>
          setSelectedYear(event.target.value as Year)
        }
      >
        <option value="" disabled>
          {l(t.report.selectYear)}
        </option>

        {dataModel?.years.map((year) => (
          <option
            key={year.key}
            value={year.key}
          >
            {l(year.name)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default YearSelect;