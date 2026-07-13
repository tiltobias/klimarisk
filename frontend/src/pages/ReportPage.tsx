import "./ReportPage.css";
import useLanguageStore, { t } from '../hooks/useLanguageStore';
import ReportDocument from '../components/report/document/ReportDocument';
import ReportViewer from "../components/report/ReportViewer";
import Header from "../components/header/Header";
import DistributionSelect from "../components/chart/DistributionSelect";
import MunicipalitySelect from "../components/report/MunicipalitySelect";
import YearSelect from "../components/report/YearSelect";
import ReportUrlSync from "../components/report/ReportUrlSync";
import { reportStylesRevision } from "../components/report/document/reportStyles";
import ReportDownloadButton from "../components/report/ReportDownloadButton";


function ReportPage() {
  const { l } = useLanguageStore();

  return (
    <div className="reportPage">
      <ReportUrlSync />
      <main>
        <Header noControls />
        <div className="reportPageContent">
          <h1>
            {l(t.report.title)}
          </h1>

          <h2>
            {l(t.report.selectMunicipality)}
          </h2>
          <p>
            {l(t.report.selectMunicipalityDescription)}
          </p>
          <MunicipalitySelect />

          <h2>
            {l(t.report.selectYear)}
          </h2>
          <p>
            {l(t.report.selectYearDescription)}
          </p>
          <YearSelect />

          <h2>
            {l(t.report.selectDistribution)}
          </h2>
          <p>
            {l(t.report.selectDistributionDescription)}
          </p>
          <DistributionSelect />

          <ReportDownloadButton />

        </div>
      </main>
      <ReportViewer document={<ReportDocument />} key={reportStylesRevision} />
    </div>
  )
}

export default ReportPage;