import "./ReportPage.css";
import useLanguageStore, { t } from '../hooks/useLanguageStore';
import ReportDocument from '../components/report/ReportDocument';
import ReportViewer from "../components/report/ReportViewer";
import LanguageSelect from "../components/header/LanguageSelect";
import Header from "../components/header/Header";


function ReportPage() {
  const { l } = useLanguageStore();

  return (
    <div className="report-page">
      <aside>
        <Header noControls />
        <h1>
          {l(t.report.title)}
          <LanguageSelect />
        </h1>
        <p>This is the report page.</p>
      </aside>
      <ReportViewer document={<ReportDocument />} />
    </div>
  )
}

export default ReportPage;