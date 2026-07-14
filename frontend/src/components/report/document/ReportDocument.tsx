import "./reportFonts";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { reportStyles as s } from "./reportStyles";
import ColorTree from "./ColorTree";
import type { ReportSnapshot } from "./reportSnapshot";


interface Props {
  report: ReportSnapshot;
}


function MunicipalityReportDocument({ report }: Props) {
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
  const yearInfo = dataModel && selectedYear ? dataModel.years.find(year => year.key === selectedYear) : undefined;


  return (
    <Document title={l(t.report.title)}>
      <Page size="A4" style={s.page}>
        {dataModel && kommuneData && kommuneCache && yearInfo && selectedKommune && (
          <>
            <View style={s.heading}>
              <Text style={s.title} bookmark={l(t.report.title)}>
                {l(t.report.title)}
              </Text>

              <View style={s.section}>
                <Text>{selectedKommune} {kommuneData.klimarisk_name}</Text>
                <Text>{selectedYear} {l(yearInfo.description)}</Text>
              </View>

              <Text>
                {}
              </Text>
            </View>

            <View style={s.sidebanner} fixed></View>
            {/* <View style={s.banner}></View> */}

            <ColorTree report={report} />
            
          </>
        )}
      </Page>
    </Document>
  );
}

export default MunicipalityReportDocument;