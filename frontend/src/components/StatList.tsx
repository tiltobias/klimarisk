import useDataStore from "../hooks/useDataStore";

function StatList() {

  const { 
    dataModel,
    data,
    selectedYear,
    selectedKommune,
    getTotalRisk,
    getElementValue,
  } = useDataStore();

  const currentKommune = data && selectedYear && selectedKommune ? data[selectedYear][selectedKommune] : null

  return (
    <div className="stat-list">
      <h2>Kommune Statistics</h2>
      {dataModel && currentKommune ? 
      (
        <ul>
          <li><strong>Kommune:</strong> {currentKommune.name} ({selectedKommune})</li>
          <li><strong>Risk:</strong> {getTotalRisk()?.toFixed(3) ?? "-"}
            <ul>
              {dataModel.elements.map((element, index) => (
                <li key={index}><strong>{element.name}:</strong> {getElementValue(index)?.toFixed(0) ?? "-"}
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