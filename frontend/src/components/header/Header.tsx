import './Header.css';
import YearSelect from './YearSelect';
import LayoutSelect from './LayoutSelect';
import LanguageSelect from './LanguageSelect';
import ReportButton from './ReportButton';


interface Props {
  noControls?: boolean;
}


function Header({ noControls }: Props) {

  return (
    <header>
      <h1>
        <a href="https://github.com/tiltobias/klimarisk" target="_blank" rel="noopener noreferrer">
          Klimarisk
        </a>
      </h1>
      {!noControls && (
        <div className="headerControls">
          <LayoutSelect />
          <YearSelect />
          <ReportButton />
        </div>
      )}
      <LanguageSelect />
    </header>
  )
}

export default Header;