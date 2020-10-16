import React, { useEffect } from 'react';
import CitySearch from '@/CitySearch';
import './index.scss';
import { getMarker, getMarkerIconHtmlStr } from './utils';

function loadMap() {
  return new Promise((resolve) => {
    const map = new window.AMap.Map('mapContainer', {
      resizeEnable: true,
      center: [116.397428, 39.90923], //中心点坐标
      zoom: 11,
      mapStyle: 'amap://styles/light',
      features: ['bg', 'road'],
    });
    map.on('complete', () => resolve(map));
  });
}

function loadPlugins(map) {
  return new Promise((resolve) => {
    map.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
      map.addControl(new window.AMap.ToolBar());
      map.addControl(new window.AMap.Scale());
      resolve();
    });
  });
}

function loadMarkerClusterer(map) {
  return new Promise((resolve) => {
    map.plugin(['AMap.MarkerClusterer'], () => {
      const rawData = window.heatmapData;
      const markers = rawData.map((item = {}) => getMarker(item));
      new window.AMap.MarkerClusterer(
        map, // 地图实例
        markers,
        {
          gridSize: 80,
          renderClusterMarker: ({ markers, marker }) => {
            const [popularMarker] = markers.sort((a, b) => {
              const { count: countA } = a.getExtData();
              const { count: countB } = b.getExtData();
              return countB - countA;
            });
            const popularMarkerData = popularMarker.getExtData();
            marker.setContent(getMarkerIconHtmlStr(popularMarkerData, true));
            const { lng, lat } = popularMarkerData;
            marker.setPosition([lng, lat]);
          },
        }
      );
      resolve();
    });
  });
}

function loadPolylines(map) {
  const polyline = new window.AMap.Polyline({
    path: [
      [116.225132, 39.872326],
      [116.246434, 39.981835],
      [116.53061, 40.103146],
    ],
    borderWeight: 2, // 线条宽度，默认为 1
    strokeColor: 'red', // 线条颜色
    lineJoin: 'round', // 折线拐点连接处样式
  });
  map.add(polyline);
}

export default function App() {
  useEffect(() => {
    (async () => {
      const map = await loadMap();
      await loadPlugins(map);
      await loadMarkerClusterer(map);
      loadPolylines(map);
    })();
  }, []);
  return (
    <div className="heatmap">
      <div id="mapContainer" className="heatmap-container" />
      <CitySearch />
    </div>
  );
}
