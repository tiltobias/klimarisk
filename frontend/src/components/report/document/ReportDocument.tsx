import "./reportFonts";
import { Document } from "@react-pdf/renderer";
import type { ReportSnapshot } from "./reportSnapshot";
import ElementPage from "./ElementPage";
import TitlePage from "./TitlePage";


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

      <TitlePage report={report} />

      {report.elements.map(element => (
        <ElementPage report={report} element={element} key={element.key} />
      ))}

    </Document>
  );
}

export default MunicipalityReportDocument;