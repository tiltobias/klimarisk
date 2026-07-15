import type { ReportSnapshot } from "./reportSnapshot";
import { Page, View, Text, Link } from "@react-pdf/renderer";
import { reportStyles as s } from "./reportStyles";


interface Props {
  report: ReportSnapshot;
  element: ReportSnapshot["elements"][number];
}

function ElementPage({ report, element }: Props) {
  const {
    l,
    t,
  } = report;

  return (
    <Page size="A4" style={[s.page, s.elementPage]}>

      <View style={s.sidebanner} fixed></View>

      <View style={s.elementPage.heading}>
        <View style={[s.elementPage.headingColorBox, {
          backgroundColor: element.color,
        }]} />

        <View style={s.elementPage.headingContent}>
          <Text style={s.title}>
            {l(element.name)}
          </Text>
          
          <Text>
            {l(element.description)}
          </Text>
        </View>
      </View>

      {element.metrics.map(metric => (
        <View key={`${element.key}-${metric.key}`} style={s.elementPage.section}>
          <View style={[s.elementPage.colorBox, {
            backgroundColor: metric.color,
          }]} />

          <Text style={s.label}>
            {l(metric.name)}
          </Text>

          <Text>
            {l(metric.description)}
          </Text>
          <Text>
            {l(t.report.document.urlLabel)} <Link src={metric.url}>{metric.url}</Link>
          </Text>
          
        </View>
      ))}

      
    </Page>
  )
}

export default ElementPage;