import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { showFailure, showSuccess, smoothScroll } from './helpers';
import createMarkup from './itemMarkup';
import fetchImages from './img-API';

const search = document.querySelector('.search-btn');
const searchField = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const endResults = document.querySelector('.text-container');

let page, query, totalHits;

const checkSearch = () => {
  search.disabled = !searchField.value;
};

if (!gallery.innerHTML) {
  loadMoreBtn.classList.add('collapse');
}
const lightbox = new SimpleLightbox('.gallery a', {});

checkSearch();

const searchImages = async event => {
  page = 1;
  event.preventDefault();
  query = searchField.value.trim();
  endResults.classList.add('collapse');
  loadMoreBtn.classList.add('collapse');

  const data = await fetchImages(query, page);
  try {
    if (data.hits.length === 0) {
      showFailure();
      gallery.innerHTML = '';
    } else {
      totalHits = data.totalHits;
      searchField.value = '';
      checkSearch();
      showSuccess(`Hooray! We found ${totalHits} images.`);
      gallery.innerHTML = createMarkup(data);
      if (page < Math.ceil(totalHits / 40)) {
        loadMoreBtn.classList.remove('collapse');
      } else {
        endResults.classList.remove('collapse');
      }

      lightbox.refresh();
      smoothScroll();
    }
  } catch {
    showFailure();
  }
};

const loadMoreImages = async event => {
  event.preventDefault();
  page += 1;
  endResults.classList.add('collapse');

  const data = await fetchImages(query, page);
  try {
    if (data.hits.length === 0) {
      showFailure();
    } else {
      gallery.insertAdjacentHTML('beforeend', createMarkup(data));

      lightbox.refresh();
      smoothScroll();
      if (page >= Math.ceil(totalHits / 40)) {
        loadMoreBtn.classList.add('collapse');
        endResults.classList.remove('collapse');
      }
    }
  } catch {
    showFailure();
  }
};

search.addEventListener('click', searchImages);
loadMoreBtn.addEventListener('click', loadMoreImages);
searchField.addEventListener('input', checkSearch);
