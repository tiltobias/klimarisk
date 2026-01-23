import './App.css'
import { useEffect } from 'react';
import useDataStore from './hooks/useDataStore'
import Map from './components/Map'

function App() {

  const {
    fetchData,
  } = useDataStore();

  // Fetch data on mount, only once
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <span id="app-title">Klimarisk</span>
      <Map />
    </>
  )
}

export default App
