import useDataStore from "../hooks/useDataStore";

function StatList() {
  
  const { 
    data: komData,
    selectedKommune
  } = useDataStore();

  return (
    <div className="stat-list">
      <h2>Kommune Statistics</h2>
      {selectedKommune && komData && komData[selectedKommune] ? 
      (
        <ul>
          <li><strong>Kommune:</strong> {komData[selectedKommune].Navn} ({selectedKommune})</li>
          <li><strong>Risk:</strong> {komData[selectedKommune].sumMetric.value}
            <ul>
              {komData[selectedKommune].elements.map((element, index) => (
                <li key={index}><strong>{element.name}:</strong> {element.value}
                  <ul>
                    {element.metrics.map((metric, mIndex) => (
                      <li key={mIndex}><strong>{metric.name}:</strong> {metric.value}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ) : (
        <p>Hover over a kommune to see details.</p>
      )
      }
    </div>
  );
}

export default StatList;