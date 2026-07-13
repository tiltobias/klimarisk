import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";

import useLanguageStore, { t } from "../../hooks/useLanguageStore";
import ReportDocument from "./document/ReportDocument";

function ReportDownloadButton() {
  const { l } = useLanguageStore();

  return (
    <div className="reportDownloadButton">
      <PDFDownloadLink
        document={<ReportDocument />}
        fileName={l(t.report.download.fileName)}
      >
        {({ loading }) => (
          <button type="button" disabled={loading}>
            <Download size={18} style={{ marginRight: "0.5rem" }} />
            {loading
              ? l(t.report.download.generating)
              : l(t.report.download.download)}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}

export default ReportDownloadButton;