import { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';

import type { FeatureCollection, Feature, Polygon, MultiPolygon, Geometry } from 'geojson';
import type { Polygon as LeafletPolygon } from 'leaflet';

type KommuneProperties = { 
  kommunenummer: number, // TODO: change to string and keep consistent (with leading zeros)
  KomNavn: string
};
type KommuneFeature = Feature<Polygon | MultiPolygon, KommuneProperties>;
type KommuneGeoJSON = FeatureCollection<Polygon | MultiPolygon, KommuneProperties>;

type KommuneData = Record<string, { 
  Navn: string; 
  Risk2000: number 
}>;

function KommuneLayer() {

  const [komGeoJSON, setKomGeoJSON] = useState<KommuneGeoJSON | null>(null);

  useEffect(() => {
    fetch('/data/kommune_simpl_25_25k.geojson')
      .then((res) => res.json())
      .then((geojson) => setKomGeoJSON(geojson));
  }, []);

  const [komData, setKomData] = useState<KommuneData | null>(null);

  useEffect(() => {
    fetch('/data/kommune_data.json')
      .then((res) => res.json())
      .then((data) => setKomData(data));
  }, []);


  const [highlightedKommune, setHighlightedKommune] = useState<number | null>(null);

  const onEachFeature = (feature: KommuneFeature, layer: LeafletPolygon) => {
    layer.on({
      mouseover: () => {
        setHighlightedKommune(feature.properties.kommunenummer);
        document.getElementById("app-title")!.innerText = `${feature.properties.kommunenummer} ${feature.properties.KomNavn}, Risk: ${komData ? komData[feature.properties.kommunenummer.toString()]?.Risk2000 : 'N/A'}`;
      },
      mouseout: () => {
        setHighlightedKommune(null);
        document.getElementById("app-title")!.innerText = `Klimarisk`;
      }
    });
  };

  const getColor = (komId: string) => {
    if (!komData) return 'gray';
    const risk = komData[komId]?.Risk2000;
    if (risk === undefined) return 'gray';
    if (risk < 100) return 'green';
    if (risk < 120) return 'yellow';
    if (risk < 140) return 'orange';
    return 'red';
  }

  const style = (feature?: Feature<Geometry, unknown>) => {

    const props = feature?.properties as KommuneProperties | undefined;

    return {
      fillColor: getColor(props?.kommunenummer.toString() || ''),
      weight: props?.kommunenummer === highlightedKommune ? 3 : 0.5,
      opacity: 1,
      color: 'black',
      fillOpacity: 0.5,
      // TODO: fix zindex issue, border goes under neighbour polygons
    };
  }

  return komGeoJSON ? <GeoJSON data={komGeoJSON} onEachFeature={onEachFeature} style={style} /> : null;
}

export default KommuneLayer;