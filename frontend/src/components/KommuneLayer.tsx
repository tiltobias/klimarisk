import { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import useDataStore from '../hooks/useDataStore';

import type { FeatureCollection, Feature, Polygon, MultiPolygon, Geometry } from 'geojson';
import type { Polygon as LeafletPolygon } from 'leaflet';
import { getPublicUrl } from '../hooks/getPublicUrl';

type KommuneProperties = { 
  kommunenummer: string, // TODO: change to string and keep consistent (with leading zeros)
  KomNavn: string
};
type KommuneFeature = Feature<Polygon | MultiPolygon, KommuneProperties>;
type KommuneGeoJSON = FeatureCollection<Polygon | MultiPolygon, KommuneProperties>;


function KommuneLayer() {

  const [komGeoJSON, setKomGeoJSON] = useState<KommuneGeoJSON | null>(null);

  useEffect(() => {
    fetch(getPublicUrl('data/kommune_simpl_25_25k.geojson'))
      .then((res) => res.json())
      .then((geojson) => setKomGeoJSON(geojson));
  }, []);

  const {
    data: komData,
    highlightedKommune,
    setHighlightedKommune,
    setSelectedKommune,
  } = useDataStore();

  const onEachFeature = (feature: KommuneFeature, layer: LeafletPolygon) => {
    layer.on({
      mouseover: () => {
        setHighlightedKommune(feature.properties.kommunenummer);
        document.getElementById("app-title")!.innerText = `${feature.properties.kommunenummer} ${feature.properties.KomNavn}, ${komData ? komData[feature.properties.kommunenummer]?.sumMetric.name : 'N/A'}: ${komData ? komData[feature.properties.kommunenummer]?.sumMetric.value : 'N/A'}`;
      },
      mouseout: () => {
        setHighlightedKommune(null);
        document.getElementById("app-title")!.innerText = `Klimarisk`;
      },
      click: () => {
        setSelectedKommune(feature.properties.kommunenummer);
      }
    });
  };

  const getColor = (komId: string) => {
    if (!komData) return 'gray';
    const risk = komData[komId]?.sumMetric.value;
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