import axios from 'axios';

function fetchData(query) {
  const params = {
    key: '49512194-f753c2f34a7e7dbbd609db53f',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  return axios.get('https://pixabay.com/api/', { params });
}

export default fetchData;
