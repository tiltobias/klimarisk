import { Page, Text, View } from "@react-pdf/renderer";
import { reportStyles as s } from "./reportStyles";
import type { ReportSnapshot } from "./reportSnapshot";
import { ordinal } from "../../../hooks/useLanguageStore";

interface Props {
  report: ReportSnapshot;
}

function TitlePage({ report }: Props) {
  const {
    l,
    t,
  } = report;

  return (
    <Page size="A4" style={s.page}>
    
      <View style={s.sidebanner} fixed></View>

      <View style={s.heading}>
        <Text style={s.title} bookmark={l(t.report.title)}>
          {l(t.report.title)}
        </Text>

        <View style={s.titlePage.chosen}>
          <Text>
            {l(t.report.document.titlePage.chosenKommune)} <Text style={s.titlePage.chosenVal}>{report.kommune.key} | {report.kommune.name}</Text>
          </Text>
          <Text>
            {l(t.report.document.titlePage.chosenYear)} <Text style={s.titlePage.chosenVal}>{l(report.year.name)} | {l(report.year.description)}</Text>
          </Text>
        </View>
      </View>

      

      <View style={s.elementPage.heading}>
        <View style={[s.elementPage.headingColorBox, {
          backgroundColor: report.risk.color,
        }]} />

        <View style={s.elementPage.headingContent}>
          <View style={[s.elementPage.titleBox, s.title]}>
            <Text>
              {l(t.common.totalRisk)}
            </Text>

            <View style={s.score}>
              <Text style={s.titleLabel}>{l(t.report.document.score)}</Text>
              <View style={s.titleScoreVal}>
                <Text style={s.emph}>{report.risk.value.toFixed(2)}</Text>
              </View> 
            </View>
          </View>

          <View style={s.description}>
            <Text>{report.risk.color}</Text>
          </View>

          <Text>
            {l(t.report.document.ranked.p1)} <Text style={s.emph}>{ordinal(report.risk.rank, report.language)}</Text> {l(t.report.document.ranked.p2)} <Text style={s.emph}>{report.kommune.numKommuneNorge}</Text> {l(t.report.document.ranked.p3)} {l(t.report.document.ranked.norge)}.
          </Text>
          <Text>
            {l(t.report.document.ranked.p1)} <Text style={s.emph}>{ordinal(report.risk.rankFylke, report.language)}</Text> {l(t.report.document.ranked.p2)} <Text style={s.emph}>{report.kommune.numKommuneFylke}</Text> {l(t.report.document.ranked.p3)} {l(t.report.document.ranked.fylke)}.
          </Text>
        </View>
      </View>

      {report.elements.map(element => (
        <View key={element.key} style={s.elementPage.section} wrap={false}>
          <View style={[s.elementPage.colorBox, {
            backgroundColor: element.color,
          }]} />

          <View style={[s.elementPage.titleBox, s.smallTitle]}>
            <Text>
              {l(element.name)}
            </Text>

            <View style={s.score}>
              <Text style={s.smallTitleLabel}>{l(t.report.document.score)}</Text>
              <View style={s.scoreVal}>
                <Text style={s.emph}>{element.value.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <View style={s.description}>
            <Text>{l(element.description)}</Text>
          </View>

          {element.metrics.map(metric => (
            <View key={`${element.key}-${metric.key}`} style={s.titlePage.metric}>
              <View style={[s.titlePage.metric.colorBox, {
                backgroundColor: metric.color,
              }]} />

              <View style={s.titlePage.metric.name}>
                <Text>{l(metric.name)}</Text>
              </View>
            </View>
          ))}
          
        </View>
      ))}


      {/* <ColorTree report={report} /> */}

    </Page>
  )
}

export default TitlePage;