import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const API_KEY = '40561275-509fd25e8eff038878750ce8a';

const search = document.querySelector('.search-btn');
const searchField = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');

const searchImages = event => {
  event.preventDefault();
  const searchParams = {
    q: searchField.value,
    image_type: 'photo',
  };
  console.log(searchField.value);
  axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchParams.q}&image_type=${searchParams.image_type}`
    )
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .then(data => {
      const markup = data.hits
        .map(item => {
          return `<div class='item-container'><a class='img-link'><img alt=${item.tags} src=${item.previewURL}></a></div>`;
        })
        .join('');
      gallery.innerHTML = markup;
    });
};

search.addEventListener('click', searchImages);
