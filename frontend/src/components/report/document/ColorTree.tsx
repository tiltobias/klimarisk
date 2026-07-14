import "./reportFonts";
import { Text, View } from "@react-pdf/renderer";
import { reportStyles as s } from "./reportStyles";
import type { ReportSnapshot } from "./reportSnapshot";


interface Props {
  report: ReportSnapshot
}


function ColorTree({ report }: Props) {

  const {
    selectedKommune,
    selectedYear,
    data,
    cache,
    dataModel,
    l,
    t,
  } = report;

  const kommuneData = data && selectedYear && selectedKommune ? data.years[selectedYear].byKommune[selectedKommune] : null;
  const kommuneCache = cache && selectedYear && selectedKommune ? cache.years[selectedYear].byKommune[selectedKommune] : null;

  const sortedElements = dataModel && kommuneData && kommuneCache ? [...dataModel.elements].sort((a, b) => {
    const aVal = a.invert ? 100 - kommuneCache[a.key] : kommuneCache[a.key];
    const bVal = b.invert ? 100 - kommuneCache[b.key] : kommuneCache[b.key];
    return -(aVal - bVal)
  }).map(element => ({
    ...element,
    metrics: [...element.metrics].sort((a, b) => {
      const aVal = a.invert ? 100 - kommuneData[a.key] : kommuneData[a.key];
      const bVal = b.invert ? 100 - kommuneData[b.key] : kommuneData[b.key];
      if (element.invert) return (aVal - bVal);
      return -(aVal - bVal)
    })
  })) : null;


  if (!sortedElements || !selectedKommune) return null;
  return (
    <View>
      <View style={s.treeItem.risk}>
        <View style={[s.treeItem.colorBox, {
          backgroundColor: dataModel.risk.color,
        }]} />

        <Text style={s.label}>
          {l(t.common.totalRisk)}
        </Text>
      </View>
      {sortedElements.map(element => (
        <View key={element.key} style={{
          marginVertical: 2,
        }}>
          <View style={s.treeItem.element}>
            <View style={[s.treeItem.colorBox, {
              backgroundColor: element.color,
            }]} />

            <Text style={s.label}>
              {l(element.name)}
            </Text>
          </View>
          {element.metrics.map(metric => (
            <View key={`${element.key}-${metric.key}`}>
              <View style={s.treeItem.metric}>
                <View style={[s.treeItem.colorBox, {
                  backgroundColor: metric.color,
                }]} />

                <Text>
                  {l(metric.name)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

export default ColorTree;