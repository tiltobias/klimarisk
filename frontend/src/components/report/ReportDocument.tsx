import useDataStore from "../../hooks/useDataStore";
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
    // selectedDistribution,
    data, 
  } = useDataStore();

  const kommuneData = data && selectedYear && selectedKommune ? data.years[selectedYear].byKommune[selectedKommune] : null;
  

  return (
    <Document title="Municipality climate risk report">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Municipality climate risk report</Text>

        <View style={styles.section}>
          <Text>{selectedKommune} {kommuneData && kommuneData.klimarisk_name}</Text>
          <Text>Time period: {selectedYear}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default MunicipalityReportDocument;