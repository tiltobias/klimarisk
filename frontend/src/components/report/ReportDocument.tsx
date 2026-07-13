import useDataStore from "../../hooks/useDataStore";
import useLanguageStore, { t } from "../../hooks/useLanguageStore";
import "./reportFonts";
import {
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { reportStyles as s } from "./reportStyles";

function MunicipalityReportDocument() {

  const {
    selectedKommune,
    selectedYear,
    data,
    dataModel,
  } = useDataStore();
  const { l } = useLanguageStore();

  const kommuneData = data && selectedYear && selectedKommune ? data.years[selectedYear].byKommune[selectedKommune] : null;
  const yearInfo = dataModel && selectedYear ? dataModel.years.find(year => year.key === selectedYear) : undefined;


  return (
    <Document title={l(t.report.title)}>
      <Page size="A4" style={s.page}>
        {dataModel && kommuneData && yearInfo && (
          <>
            <Text style={s.title}>{l(t.report.title)}</Text>

            <View style={s.section}>
              <Text>{selectedKommune} {kommuneData.klimarisk_name}</Text>
              <Text>{selectedYear} {l(yearInfo.description)}</Text>
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}

export default MunicipalityReportDocument;