import { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import useDataStore, { type KommuneNr } from '../hooks/useDataStore';

import type { FeatureCollection, Feature, Polygon, MultiPolygon, Geometry } from 'geojson';
import type { Polygon as LeafletPolygon } from 'leaflet';
import { getDataFileJSON } from '../hooks/getPublicUrl';

type KommuneProperties = { 
  kommunenummer: KommuneNr; 
  KomNavn: string; 
};
type KommuneFeature = Feature<Polygon | MultiPolygon, KommuneProperties>;
type KommuneGeoJSON = FeatureCollection<Polygon | MultiPolygon, KommuneProperties>;


function KommuneLayer() {

  const [komGeoJSON, setKomGeoJSON] = useState<KommuneGeoJSON | null>(null);

  useEffect(() => {
    getDataFileJSON('kommune_simpl_25_25k.geojson').then(geojson => setKomGeoJSON(geojson));
  }, []);

  const {
    highlightedKommune,
    setHighlightedKommune,
    setSelectedKommune,
    getRiskColor,
  } = useDataStore();

  const onEachFeature = (feature: KommuneFeature, layer: LeafletPolygon) => {
    layer.on({
      mouseover: () => {
        setHighlightedKommune(feature.properties.kommunenummer);
        document.getElementById("app-title")!.innerText = `${feature.properties.kommunenummer} ${feature.properties.KomNavn}`;
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

  const getColor = (komNr: KommuneNr | null) => {
    return komNr ? getRiskColor(komNr): 'gray';
  }

  const style = (feature?: Feature<Geometry, unknown>) => {

    const props = feature?.properties as KommuneProperties | undefined;

    return {
      fillColor: getColor(props?.kommunenummer || null),
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