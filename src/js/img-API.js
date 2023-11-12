import axios from 'axios';

const API_KEY = '40561275-509fd25e8eff038878750ce8a';

const fetchImages = (q, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&per_page=40&page=${page}`
    )
    .then(res => res.data);
};

export default fetchImages;
