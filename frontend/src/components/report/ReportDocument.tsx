import useDataStore from "../../hooks/useDataStore";
import useLanguageStore, { t } from "../../hooks/useLanguageStore";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
});

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
      <Page size="A4" style={styles.page}>
        {dataModel && kommuneData && yearInfo && (
          <>
            <Text style={styles.title}>{l(t.report.title)}</Text>

            <View style={styles.section}>
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