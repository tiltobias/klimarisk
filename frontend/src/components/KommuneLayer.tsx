import { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';

import type { FeatureCollection, Feature, Polygon, MultiPolygon, Geometry } from 'geojson';
import type { Polygon as LeafletPolygon } from 'leaflet';

type KommuneProperties = { 
  kommunenummer: number,
  KomNavn: string
};

type KommuneFeature = Feature<Polygon | MultiPolygon, KommuneProperties>;


function KommuneLayer() {

  const [data, setData] = useState<FeatureCollection<Polygon | MultiPolygon> | null>(null);

  useEffect(() => {
    fetch('/data/kommune_simpl_25_25k.geojson')
      .then((res) => res.json())
      .then((geojson) => setData(geojson));
  }, []);


  const [highlightedKommune, setHighlightedKommune] = useState<number | null>(null);

  const onEachFeature = (feature: KommuneFeature, layer: LeafletPolygon) => {
    layer.on({
      mouseover: () => {
        setHighlightedKommune(feature.properties.kommunenummer);
        document.getElementById("app-title")!.innerText = `${feature.properties.kommunenummer} ${feature.properties.KomNavn}`;
      },
      mouseout: () => {
        setHighlightedKommune(null);
        document.getElementById("app-title")!.innerText = `Klimarisk`;
      }
    });
  };

  const style = (feature?: Feature<Geometry, unknown>) => {

    const props = feature?.properties as KommuneProperties | undefined;

    return {
      fillColor: props?.kommunenummer === highlightedKommune ? 'yellow' : 'blue',
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.5
    };
  }

  return data ? <GeoJSON data={data} onEachFeature={onEachFeature} style={style} /> : null;
}

export default KommuneLayer;