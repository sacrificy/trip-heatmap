import { listCityMarkers } from '@/request';

export function loadMap() {
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

export function loadPlugins(map) {
  return new Promise((resolve) => {
    map.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
      map.addControl(new window.AMap.ToolBar());
      map.addControl(new window.AMap.Scale());
      resolve();
    });
  });
}

export async function loadMarkers(map) {
  const data = await listCityMarkers();
  const markers = data.map((item = {}) => getMarker(item, map));
  map.add(markers);
}

export function loadDrive(map) {
  return new Promise((resolve) => {
    map.plugin(['AMap.Driving'], () => {
      const driving = new window.AMap.Driving({
        map,
        showTraffic: false,
        hideMarkers: true,
      });
      // 根据起终点经纬度规划驾车导航路线
      driving.search(
        [116.211721, 39.688611],
        [115.957457, 39.599769],
        {
          waypoints: [[116.314029, 39.516896]],
        },
        function (status, result) {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === 'complete') {
            // log.success('绘制驾车路线完成');
          } else {
            // log.error('获取驾车数据失败：' + result);
          }
          resolve();
        }
      );
    });
  });
}

export function getMarker(data, map) {
  const { lng, lat } = data;
  const marker = new window.AMap.Marker({
    position: [lng, lat],
    extData: data,
    content: `
    <div class="marker-icon">
      <div class="droplet-wrapper">
        <div class="droplet" style="background-color: #1890ff"></div>
      </div>
      <div class="text" style="color: #1890ff">景点</div>
    </div>
  `,
    anchor: 'center',
    offset: new window.AMap.Pixel(0, 0),
  });
  marker.on('click', () => {
    const addButton = getAddButton(data);
    map.add(addButton);
  });
  return marker;
}

export function getAddButton(data) {
  const { lng, lat } = data;
  const marker = new window.AMap.Marker({
    position: [lng, lat],
    extData: data,
    content: `
      <div class="add-button">+</div>
    `,
    anchor: 'center',
    offset: new window.AMap.Pixel(20, -30),
  });
  marker.on('click', () => {
    console.log(data);
  });
  return marker;
}
