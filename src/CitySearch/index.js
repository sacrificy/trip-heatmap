import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar, List } from 'antd-mobile';
import './index.scss';

const Item = List.Item;

export default function CitySearch(props) {
  const { mapClass } = props
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [value, setValue] = useState('');
  const [district, setDistrict] = useState("北京市");

  useEffect(() => {
    (async function f() {
      let res = await axios.get('/cityjson') //这里使用搜狐的ip信息查询接口
      console.log(res.data)
    })()
  }, [])

  const handleChange = (value) => {
    setValue(value);
    if (value) {
      window.AMap.plugin('AMap.DistrictSearch', function () {
        var districtSearch = new window.AMap.DistrictSearch({
          // 关键字对应的行政区级别，country表示国家
          level: 'province',
          //  显示下级行政区级数，1表示返回下一级行政区
          subdistrict: 0
        })
        // 搜索所有省/直辖市信息
        districtSearch.search(value, function (status, result) {
          // 查询成功时，result即为对应的行政区信息
          console.log(result)
          if (result.districtList)
            setList(result.districtList)
          setShowList(true)
        })
      })
    }
  }
  const handleClickCity = (item) => {
    // const position =  new window.AMap.LngLat(116, 39)
    mapClass.setCenter(item.center);
    setDistrict(item.name);
    handleClear();
  }
  const handleClear = () => {
    setShowList(false);
    setValue('');
    setList([]);
  }
  return (
    <div className="city-search">
      <div className="search-box">
        <div className="search-text">{district}</div>
        <SearchBar placeholder="查询城市"
          value={value}
          onChange={handleChange}
          onCancel={handleClear}
          onClear={handleClear}
          style={{ flexGrow: "1" }}
        />
      </div>
      {showList && (
        <List className="my-list">
          {list.map((item) => (
            <Item key={item.adcode} onClick={() => { handleClickCity(item) }}>{item.name}</Item>))}
        </List>
      )}
    </div>
  );
}