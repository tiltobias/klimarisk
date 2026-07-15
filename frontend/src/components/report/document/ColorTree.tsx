import "./reportFonts";
import { Text, View } from "@react-pdf/renderer";
import { reportStyles as s } from "./reportStyles";
import type { ReportSnapshot } from "./reportSnapshot";


interface Props {
  report: ReportSnapshot
}


function ColorTree({ report }: Props) {

  const {
    l,
    t,
  } = report;

  return (
    <View style={s.colorTree}>
      <View style={s.treeItem.risk}>
        <View style={[s.treeItem.colorBox, {
          backgroundColor: report.risk.color,
        }]} />

        <Text style={s.label}>
          {l(t.common.totalRisk)}
        </Text>
      </View>
      {report.elements.map(element => (
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