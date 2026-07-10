import "./ReportPage.css";
import { PDFViewer } from '@react-pdf/renderer';
import ReportDocument from '../components/report/ReportDocument';


function ReportPage() {


  return (
    <div className="report-page">
      <aside>
        <h1>Report Page</h1>
        <p>This is the report page.</p>
      </aside>
      <PDFViewer 
        className="pdf-viewer"
        showToolbar={false}
      >
        <ReportDocument />
      </PDFViewer>
    </div>
  )
}

export default ReportPage;