import useDataStore from '../../hooks/useDataStore';
import useLanguageStore, { t } from '../../hooks/useLanguageStore';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

function ReportButton() {
  const {
    selectedKommune,
    selectedYear,
  } = useDataStore();
  const { 
    language,
    l,
  } = useLanguageStore();

  const params = new URLSearchParams(location.search);
  if (selectedKommune) params.set("k", selectedKommune);
  if (selectedYear) params.set("y", selectedYear);
  params.set("l", language);

  return (
    <div className="reportButton">
      <Link
        to={{
          pathname: "/report",
          search: params.toString(),
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Download size={18} style={{ marginRight: "0.5rem" }} />
        {l(t.details.generateReport)}
      </Link>
    </div>
  );
}

export default ReportButton;