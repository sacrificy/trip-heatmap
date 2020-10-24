import axios from 'axios';
import mock from './mock';

axios.interceptors.response.use((response) => {
  return response.data;
});

export async function listCityMarkers() {
  // return axios.get(
  //   'https://www.easy-mock.com/mock/5f927886dc0cf25a6b30afb9/heatmap/listCityMarkers'
  // );
  return mock;
}
