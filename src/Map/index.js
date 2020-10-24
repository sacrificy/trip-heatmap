import React, { useEffect, useState } from 'react';
import CitySearch from '@/CitySearch';
import './index.scss';
import { loadMap, loadPlugins, loadMarkers, loadDrive } from './utils';

export default function App() {
  const [map, setMap] = useState();
  useEffect(() => {
    (async () => {
      const nextMap = await loadMap();
      await loadPlugins(nextMap);
      // await loadMarkers(nextMap);
      // loadDrive(nextMap);
      setMap(nextMap);
    })();
  }, []);
  const setCityMarkers = () => {
    loadMarkers(map);
  };
  return (
    <div className="heatmap">
      <div id="mapContainer" className="heatmap-container" />
      <div id="panel"></div>
      <CitySearch map={map} setCityMarkers={setCityMarkers} />
    </div>
  );
}
