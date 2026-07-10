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
  return (
    <Document title="Municipality climate risk report">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Municipality climate risk report</Text>

        <View style={styles.section}>
          <Text>Trondheim</Text>
          <Text>Time period: 2100</Text>
        </View>
      </Page>
    </Document>
  );
}

export default MunicipalityReportDocument;