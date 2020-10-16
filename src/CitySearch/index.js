import React, { useState } from 'react';
import { SearchBar, List } from 'antd-mobile';
import './index.scss';

const Item = List.Item;

export default function CitySearch() {
  const [list, setList] = useState([]);
  return (
    <div className="city-search">
      <SearchBar placeholder="查询城市" />
      {list.length > 0 ? (
        <List className="my-list">
          <Item extra={'extra content'}>Title</Item>
        </List>
      ) : null}
    </div>
  );
}
