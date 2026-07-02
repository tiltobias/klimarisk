import useDataStore from "../../hooks/useDataStore";
import "./Map.css";

interface Props {
  mouseOnMap: boolean;
}

function KommuneLabel({ mouseOnMap }: Props) {
  const {
    highlightedKommune,
    data,
    selectedYear,
    // selectedKommune,
  } = useDataStore();

  return (
    <>
      {mouseOnMap ? (
        <>
          {highlightedKommune && data && selectedYear && (
            <div className="kommuneLabel">
              {data.years[selectedYear].byKommune[highlightedKommune].klimarisk_name}
            </div>
          )}
        </>
      ) : (
        <>
          {/* {selectedKommune && data && selectedYear && (
            <div className="kommuneLabel">
              {data.years[selectedYear].byKommune[selectedKommune].klimarisk_name}
            </div>
          )} */}
        </>
      )}
    </>
  )
}

export default KommuneLabel;