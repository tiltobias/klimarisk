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
import { getDescendingRank } from "../hooks/statistics";


function ReportPage() {
  const {
    selectedYear,
    selectedKommune,
    data,
    cache,
    dataModel,
    getRiskColor,
    getFylkeDistribution,
  } = useDataStore();
  const { 
    l,
    language,
  } = useLanguageStore();

  const report: ReportSnapshot | null = useMemo(() => {
    if (!selectedKommune || !selectedYear || !data || !cache || !dataModel) return null;

    const yearData = data.years[selectedYear];
    const yearCache = cache.years[selectedYear];
    const kommuneData = data.years[selectedYear].byKommune[selectedKommune];
    const kommuneCache = cache.years[selectedYear].byKommune[selectedKommune];

    // dataModel sorted by risk contribution and containing colors
    const reportDataModel = {
      elements: dataModel.elements.map(e => ({
        ...e,

        metrics: e.metrics.map(m => ({
          ...m,

          color: getRiskColor(selectedKommune, { type: "metric", key: m.key }),
          value: kommuneData[m.key],
          rank: getDescendingRank(yearData.byMetric[m.key], yearData.byKommune[selectedKommune][m.key], !!m.invert !== !!e.invert),
          rankFylke: getDescendingRank(getFylkeDistribution(selectedKommune, { type: "metric", key: m.key }, selectedYear)!, yearData.byKommune[selectedKommune][m.key], !!m.invert !== !!e.invert)

        })).sort((a, b) => {
          const aVal = a.invert ? 100 - kommuneData[a.key] : kommuneData[a.key];
          const bVal = b.invert ? 100 - kommuneData[b.key] : kommuneData[b.key];
          if (e.invert) return (aVal - bVal);
          return -(aVal - bVal)
        }),

        color: getRiskColor(selectedKommune, { type: "element", key: e.key }),
        value: kommuneCache[e.key],
        rank: getDescendingRank(yearCache.byElement[e.key], yearCache.byKommune[selectedKommune][e.key], e.invert),
        rankFylke: getDescendingRank(getFylkeDistribution(selectedKommune, { type: "element", key: e.key }, selectedYear)!, yearCache.byKommune[selectedKommune][e.key], e.invert),

      })).sort((a, b) => {
        const aVal = a.invert ? 100 - kommuneCache[a.key] : kommuneCache[a.key];
        const bVal = b.invert ? 100 - kommuneCache[b.key] : kommuneCache[b.key];
        return -(aVal - bVal)
      }),

      risk: {
        color: getRiskColor(selectedKommune, { type: "risk" }),
        value: kommuneCache.totalRisk,
        rank: getDescendingRank(yearCache.byTotalRisk, yearCache.byKommune[selectedKommune].totalRisk),
        rankFylke: getDescendingRank(getFylkeDistribution(selectedKommune, { type: "risk" }, selectedYear)!, yearCache.byKommune[selectedKommune].totalRisk),
      },
      kommune: {
        key: selectedKommune,
        name: kommuneData.klimarisk_name,
      },
      year: dataModel.years.find(year => year.key === selectedYear)!,

    } as const;


    return {
      ...reportDataModel,
      language,
      l: (entry) => entry ? entry[language] : undefined,
      t,
    };
  }, [selectedKommune, selectedYear, data, cache, dataModel, language, getRiskColor, getFylkeDistribution]);


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
            report.kommune.key,
            report.year.key,
            report.language
          ].join("-")}   
          document={<ReportDocument report={report} />} 
        />
      )}
    </div>
  )
}

export default ReportPage;