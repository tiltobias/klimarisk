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
    <Page size="A4" style={[s.page, s.elementPage]} bookmark={l(element.name)} id={element.key}>

      <Text 
        fixed
        style={s.pageNumber}
        render={({ pageNumber, totalPages }) => 
          `${pageNumber} / ${totalPages}`
        }
      />

      <View style={s.sidebanner} fixed></View>

      <View style={s.elementPage.heading}>
        <View style={[s.elementPage.headingColorBox, {
          backgroundColor: element.color,
        }]} />

        <View style={s.elementPage.headingContent}>
          <View style={[s.elementPage.titleBox, s.title]}>
            <Text>
              {l(element.name)}
            </Text>

            <View style={s.score}>
              <Text style={s.titleLabel}>{l(t.report.document.score)}</Text>
              <View style={s.titleScoreVal}>
                <Text style={s.emph}>{element.value.toFixed(2)}</Text>
              </View> 
            </View>
          </View>

          <View style={s.description}>
            <Text>{l(element.description)}</Text>
          </View>

          <Text>
            {l(t.report.document.ranked.p1)} <Text style={s.emph}>{ordinal(element.rank, report.language)}</Text> {l(t.report.document.ranked.p2)} <Text style={s.emph}>{report.kommune.numKommuneNorge}</Text> {l(t.report.document.ranked.p3)} {l(t.report.document.ranked.norge)}.
          </Text>
          <Text>
            {l(t.report.document.ranked.p1)} <Text style={s.emph}>{ordinal(element.rankFylke, report.language)}</Text> {l(t.report.document.ranked.p2)} <Text style={s.emph}>{report.kommune.numKommuneFylke}</Text> {l(t.report.document.ranked.p3)} {l(t.report.document.ranked.fylke)}.
          </Text>
        </View>
      </View>

      {element.metrics.map(metric => (
        <View key={`${element.key}-${metric.key}`} style={s.elementPage.section} wrap={false} bookmark={l(metric.name)} id={metric.key}>
          <View style={[s.elementPage.colorBox, {
            backgroundColor: metric.color,
          }]} />

          <View style={[s.elementPage.titleBox, s.smallTitle]}>
            <Text>
              {l(metric.name)}
            </Text>

            <View style={s.score}>
              <Text style={s.smallTitleLabel}>{l(t.report.document.score)}</Text>
              <View style={s.scoreVal}>
                <Text style={s.emph}>{metric.value.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <View style={s.description}>
            <Text>{l(metric.description)}</Text>
          </View>
          <Text style={s.url}>
            <Text style={s.description}>{l(t.report.document.urlLabel)}</Text> <Link src={metric.url}>{metric.url}</Link>
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