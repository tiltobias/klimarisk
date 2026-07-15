import type { ReportSnapshot } from "./reportSnapshot";
import { Page, View, Text, Link } from "@react-pdf/renderer";
import { reportStyles as s } from "./reportStyles";
import { ordinal } from "../../../hooks/useLanguageStore";


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
          
          <Text style={s.description}>
            {l(element.description)}
          </Text>

          <Text>
            <Text style={s.label}>{l(t.report.document.score)}</Text> <Text style={s.emph}>{element.value.toFixed(2)}</Text> 
          </Text>
          <Text>
            {l(t.report.document.ranked.p1)} <Text style={s.emph}>{ordinal(element.rank, report.language)}</Text> {l(t.report.document.ranked.p2)} <Text style={s.emph}>{report.kommune.numKommuneNorge}</Text> {l(t.report.document.ranked.p3)} {l(t.report.document.ranked.norge)}.
          </Text>
          <Text>
            {l(t.report.document.ranked.p1)} <Text style={s.emph}>{ordinal(element.rankFylke, report.language)}</Text> {l(t.report.document.ranked.p2)} <Text style={s.emph}>{report.kommune.numKommuneFylke}</Text> {l(t.report.document.ranked.p3)} {l(t.report.document.ranked.fylke)}.
          </Text>
        </View>
      </View>

      {element.metrics.map(metric => (
        <View key={`${element.key}-${metric.key}`} style={s.elementPage.section}>
          <View style={[s.elementPage.colorBox, {
            backgroundColor: metric.color,
          }]} />

          <Text style={s.smallTitle}>
            {l(metric.name)}
          </Text>

          <Text style={s.description}>
            {l(metric.description)}
          </Text>
          <Text style={s.url}>
            <Text style={s.description}>{l(t.report.document.urlLabel)}</Text> <Link src={metric.url}>{metric.url}</Link>
          </Text>

          <Text>
            <Text style={s.label}>{l(t.report.document.score)}</Text> <Text style={s.emph}>{metric.value.toFixed(2)}</Text> 
          </Text>
          <Text>
            {l(t.report.document.ranked.p1)} <Text style={s.emph}>{ordinal(metric.rank, report.language)}</Text> {l(t.report.document.ranked.p2)} <Text style={s.emph}>{report.kommune.numKommuneNorge}</Text> {l(t.report.document.ranked.p3)} {l(t.report.document.ranked.norge)}.
          </Text>
          <Text>
            {l(t.report.document.ranked.p1)} <Text style={s.emph}>{ordinal(metric.rankFylke, report.language)}</Text> {l(t.report.document.ranked.p2)} <Text style={s.emph}>{report.kommune.numKommuneFylke}</Text> {l(t.report.document.ranked.p3)} {l(t.report.document.ranked.fylke)}.
          </Text>
          
        </View>
      ))}

      
    </Page>
  )
}

export default ElementPage;