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
    language,
  } = report;

  return (
    <Document 
      title={l(t.report.title)}
      author="Tobias Andresen / Noradapt"
      subject={`${report.kommune.key} ${report.kommune.name} | ${l(report.year.name)} ${l(report.year.description)}`}
      keywords="climate risk, klimarisiko, Noradapt, Klimamonitor, municipality, kommune, Klimarisk"
      creator="Klimarisk Dashboard"
      language={language}
    >

      <TitlePage report={report} />

      {report.elements.map(element => (
        <ElementPage report={report} element={element} key={element.key} />
      ))}

    </Document>
  );
}

export default MunicipalityReportDocument;