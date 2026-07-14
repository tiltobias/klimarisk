import "./ReportPage.css";
import { useMemo } from "react";
import useDataStore from "../hooks/useDataStore";
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
import { type ReportSnapshot } from "../components/report/document/reportSnapshot";


function ReportPage() {
  const {
    selectedYear,
    selectedKommune,
    data,
    cache,
    dataModel,
    getRiskColor,
  } = useDataStore();
  const { 
    l,
    language,
  } = useLanguageStore();

  const report: ReportSnapshot | null = useMemo(() => {
    if (!selectedKommune || !selectedYear || !data || !cache || !dataModel) return null;

    const kommuneData = data.years[selectedYear].byKommune[selectedKommune];
    const kommuneCache = cache.years[selectedYear].byKommune[selectedKommune];

    // dataModel sorted by risk contribution and containing colors
    const reportDataModel = {
      ...dataModel,
      elements: dataModel.elements.map(element => ({
        ...element,
        color: getRiskColor(selectedKommune, { type: "element", key: element.key }),
        metrics: element.metrics.map(metric => ({
          ...metric,
          color: getRiskColor(selectedKommune, { type: "metric", key: metric.key }),
        })).sort((a, b) => {
          const aVal = a.invert ? 100 - kommuneData[a.key] : kommuneData[a.key];
          const bVal = b.invert ? 100 - kommuneData[b.key] : kommuneData[b.key];
          if (element.invert) return (aVal - bVal);
          return -(aVal - bVal)
        })
      })).sort((a, b) => {
        const aVal = a.invert ? 100 - kommuneCache[a.key] : kommuneCache[a.key];
        const bVal = b.invert ? 100 - kommuneCache[b.key] : kommuneCache[b.key];
        return -(aVal - bVal)
      }),
      risk: {
        color: getRiskColor(selectedKommune, { type: "risk" }),
      },
    } as const;


    return {
      selectedKommune,
      selectedYear,
      data,
      cache,
      dataModel: reportDataModel,
      language,
      l: (entry) => entry ? entry[language] : undefined,
      t,
    };
  }, [selectedKommune, selectedYear, data, cache, dataModel, language, getRiskColor]);


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

          {report && (
            <ReportDownloadButton report={report} />
          )}

        </div>
      </main>
      {report && (
        <ReportViewer 
          key={[
            reportStylesRevision,
            report.selectedKommune,
            report.selectedYear,
            report.language
          ].join("-")}   
          document={<ReportDocument report={report} />} 
        />
      )}
    </div>
  )
}

export default ReportPage;