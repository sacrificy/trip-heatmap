import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar, List } from 'antd-mobile';
import './index.scss';
import { loadPlugins, loadMarkers, loadDrive } from '../Map/utils';

const Item = List.Item;

export default function CitySearch(props) {
  const { map, setCityMarkers } = props;
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [value, setValue] = useState('');
  const [district, setDistrict] = useState('北京市');

  useEffect(() => {
    (async function f() {
      let res = await axios.get('/city/info?cityId=13')
      console.log(res)
    })()
  }, [])

  const handleChange = (value) => {
    setValue(value);
    const url = `/city/search?key=${value}&size=10`;
    axios.get(url)
      .then(function (response) {
        if (response.list) {
          setShowList(true);
          setList(response.list);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClickCity = (item) => {
    let position = new window.AMap.LngLat(item.lon, item.lat);
    map.setCenter(position);
    setDistrict(item.cityName);
    handleClear();
    const url = `/city/info?cityId=${item.cityId}`;
    axios.get(url)
      .then(function (response) {
        if (response.poiInfos) {
          let markerList = response.poiInfos.map(item => getMarker(item))
          map.add(markerList);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setCityMarkers();
  };
  const handleClear = () => {
    setShowList(false);
    setValue('');
    setList([]);
  };
  return (
    <div className="city-search">
      <div className="search-box">
        <div className="search-text">{district}</div>
        <SearchBar
          placeholder="查询城市"
          value={value}
          onChange={handleChange}
          onCancel={handleClear}
          onClear={handleClear}
          style={{ flexGrow: '1' }}
        />
      </div>
      {showList && (
        <List className="my-list">
          {list.map((item) => (
            <Item
              key={item.cityId}
              onClick={() => {
                handleClickCity(item);
              }}
            >
              {item.cityName}
            </Item>
          ))}
        </List>
      )}
    </div>
  );
}

function getMarker(data) {
  const { glatPoi, glonPoi } = data;
  const marker = new window.AMap.Marker({
    position: [glonPoi, glatPoi],
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
  return marker;
}
