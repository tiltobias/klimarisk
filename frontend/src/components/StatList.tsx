import useDataStore from "../hooks/useDataStore";

function StatList() {

  const { 
    data: komData,
    selectedYear,
    selectedKommune,
    getTotalRisk,
    getElementTotal,
  } = useDataStore();

  const currentKommune = komData && selectedYear && selectedKommune ? komData[selectedYear][selectedKommune] : null

  return (
    <div className="stat-list">
      <h2>Kommune Statistics</h2>
      {currentKommune ? 
      (
        <ul>
          <li><strong>Kommune:</strong> {currentKommune.name} ({selectedKommune})</li>
          <li><strong>Risk:</strong> {currentKommune.sumMetric.value.toFixed(3)} == {getTotalRisk()?.toFixed(3) ?? "-"}
            <ul>
              {currentKommune.elements.map((element, index) => (
                <li key={index}><strong>{element.name}:</strong> {element.value - (getElementTotal(index) || 999)} --- {element.value.toFixed(0)}
                  <ul>
                    {element.metrics.map((metric, mIndex) => (
                      <li key={mIndex}><strong>{metric.name}:</strong> {metric.value.toFixed(0)}</li>
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