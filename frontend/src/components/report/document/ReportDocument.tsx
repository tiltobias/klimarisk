import "./reportFonts";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { reportStyles as s } from "./reportStyles";
import ColorTree from "./ColorTree";
import type { ReportSnapshot } from "./reportSnapshot";
import ElementPage from "./ElementPage";


interface Props {
  report: ReportSnapshot;
}


function MunicipalityReportDocument({ report }: Props) {
  const {
    l,
    t,
  } = report;

  return (
    <Document title={l(t.report.title)}>
      <Page size="A4" style={s.page}>
        {report && (
          <>
            <View style={s.heading}>
              <Text style={s.title} bookmark={l(t.report.title)}>
                {l(t.report.title)}
              </Text>

              <View style={s.section}>
                <Text>{report.kommune.key} {report.kommune.name}</Text>
                <Text>{l(report.year.name)} {l(report.year.description)}</Text>
              </View>

              <Text>
                {}
              </Text>
            </View>

            <View style={s.sidebanner} fixed></View>

            <ColorTree report={report} />
            
          </>
        )}
      </Page>
      {report.elements.map(element => (
        <ElementPage report={report} element={element} key={element.key} />
      ))}
    </Document>
  );
}

export default MunicipalityReportDocument;