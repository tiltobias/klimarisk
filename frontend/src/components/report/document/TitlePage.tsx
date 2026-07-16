import { Page, Text, View, Link } from "@react-pdf/renderer";
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
    
      <Text 
        fixed
        style={s.pageNumber}
        render={({ pageNumber, totalPages }) => 
          `${pageNumber} / ${totalPages}`
        }
      />

      <View style={s.sidebanner} fixed></View>

      <View style={s.heading} bookmark={l(t.report.title)}>
        <Text style={s.title}>
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

      
      <View bookmark={l(report.risk.name)} style={s.titlePage.headingMargin} />

      <View style={[s.elementPage.heading, s.titlePage.heading]}>
        <View style={[s.elementPage.headingColorBox, {
          backgroundColor: report.risk.color,
        }]} />

        <View style={s.elementPage.headingContent}>
          <View style={[s.elementPage.titleBox, s.title]}>
            <Text>
              {l(report.risk.name)}
            </Text>

            <View style={s.score}>
              <Text style={s.titleLabel}>{l(t.report.document.score)}</Text>
              <View style={s.titlePage.titleScoreVal}>
                <Text style={s.emph}>{report.risk.value.toFixed(2)}</Text>
              </View> 
            </View>
          </View>

          <View style={s.description}>
            <Text>{l(report.risk.description)}</Text>
          </View>

          <Text style={s.ranking}>
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
              <Link src={`#${element.key}`} style={s.titlePage.navLink}>{l(element.name)}</Link>
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
                <Text>
                  <Link src={`#${metric.key}`} style={s.titlePage.navLink}>{l(metric.name)}</Link>
                </Text>
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