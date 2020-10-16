export function getMarker(data) {
  const { lng, lat, count } = data;
  const marker = new window.AMap.Marker({
    position: [lng, lat],
    extData: data,
    content: getMarkerIconHtmlStr({ count }),
    anchor: 'center',
    offset: new window.AMap.Pixel(0, 0),
  });
  marker.on('click', () => {
    console.log(data);
  });
  return marker;
}

export function getMarkerIconHtmlStr({ count }, isClusterMarker = false) {
  const text = `景点 ${(count / 20).toFixed(1)}分`;
  let opacity = 1;
  if (count < 80) {
    opacity = (count + 20) / 100;
  }
  return `
    <div class="marker-icon" style="opacity: ${opacity};">
      <div class="droplet-wrapper">
        <div class="droplet"></div>
        ${
          isClusterMarker
            ? '<div class="droplet left"></div><div class="droplet right"></div>'
            : ''
        }
      </div>
      <div class="text">${text}</div>
    </div>
  `;
}
