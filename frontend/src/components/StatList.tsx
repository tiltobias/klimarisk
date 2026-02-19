import useDataStore from "../hooks/useDataStore";

function StatList() {

  const { 
    dataModel,
    data,
    cache,
    selectedYear,
    selectedKommune,
  } = useDataStore();

  const currentKommune = data && selectedYear && selectedKommune ? data[selectedYear][selectedKommune] : null
  const currentKommuneCache = cache && selectedYear && selectedKommune ? cache[selectedYear][selectedKommune] : null

  return (
    <div>
      <h2>Kommune Statistics</h2>
      {dataModel && currentKommune && currentKommuneCache ? 
      (
        <ul>
          <li><strong>Kommune:</strong> {currentKommune.name} ({selectedKommune})</li>
          <li><strong>Risk:</strong> {currentKommuneCache.totalRisk.toFixed(3) ?? "-"}
            <ul>
              {dataModel.elements.map((element, index) => (
                <li key={index}><strong>{element.name}:</strong> {currentKommuneCache[index]?.toFixed(0) ?? "-"}
                  <ul>
                    {element.metrics.map((metric, mIndex) => (
                      <li key={mIndex}><strong>{metric.name}:</strong> {currentKommune[metric.key]?.toFixed(0) ?? "-"}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ) : (
        <p>Click on a kommune to see details.</p>
      )
      }
    </div>
  );
}

export default StatList;