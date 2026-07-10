import useLanguageStore, { t } from '../../hooks/useLanguageStore';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

function ReportButton() {
  const { l } = useLanguageStore();

  return (
    <div className="reportButton">
      <Link
        to="/report"
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