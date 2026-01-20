import { useState, useEffect } from 'react';
import type { FeatureCollection } from 'geojson';
import { GeoJSON } from 'react-leaflet';

function KommuneLayer() {

  const [data, setData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch('/data/kommune_simpl_25_25k.geojson')
      .then((res) => res.json())
      .then((geojson) => setData(geojson));
  }, []);

  return data ? <GeoJSON data={data} /> : null;
}

export default KommuneLayer;