import React, { useState, useEffect } from 'react';
import './App.css';

function loadMap() {
  return new Promise((resolve) => {
    const map = new window.AMap.Map('container', {
      resizeEnable: true,
      center: [116.418261, 39.921984],
      zoom: 11,
    });
    map.on('complete', () => resolve(map));
  });
}

export default function App() {
  const [heatmap, setHeatmap] = useState(undefined);
  useEffect(() => {
    (async () => {
      const map = await loadMap();
      map.plugin(['AMap.Heatmap'], () => {
        //初始化heatmap对象
        const nextHeatmap = new window.AMap.Heatmap(map, {
          radius: 25, //给定半径
          opacity: [0, 0.8],
        });
        //设置数据集：该数据为北京部分“公园”数据
        nextHeatmap.setDataSet({
          data: window.heatmapData,
          max: 100,
        });
        setHeatmap(nextHeatmap);
      });
    })();
  }, []);
  return (
    <>
      <div id="container"></div>
      <div className="input-card" style={{ width: 'auto' }}>
        <div className="input-item">
          <button className="btn" onClick={() => heatmap.show()}>
            显示热力图
          </button>
        </div>
        <div className="input-item">
          <button className="btn" onClick={() => heatmap.hide()}>
            关闭热力图
          </button>
        </div>
      </div>
    </>
  );
}
