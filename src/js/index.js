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
  query = searchField.value;
  const data = await fetchImages(query, page);
  try {
    if (data.hits.length === 0) {
      showFailure();
      gallery.innerHTML = '';
      loadMoreBtn.classList.add('collapse');
    } else {
      totalHits = data.totalHits;
      showSuccess(`Hooray! We found ${totalHits} images.`);
      searchField.value = '';
      checkSearch();
      gallery.innerHTML = createMarkup(data);
      loadMoreBtn.classList.remove('collapse');
      lightbox.refresh();
      smoothScroll();
    }
  } catch {
    showFailure();
  }
};

const loadMoreImages = async event => {
  event.preventDefault();
  if (page >= Math.ceil(totalHits / 40)) {
    showFailure(`We're sorry, but you've reached the end of search results.`, {
      timeout: 1500,
      position: 'center-bottom',
      distance: '20px',
    });
    loadMoreBtn.classList.add('collapse');
  } else {
    page += 1;
    const data = await fetchImages(query, page);
    try {
      if (data.hits.length === 0) {
        showFailure();
      } else {
        gallery.insertAdjacentHTML('beforeend', createMarkup(data));
        lightbox.refresh();
        smoothScroll();
      }
    } catch {
      showFailure();
    }
  }
};

search.addEventListener('click', searchImages);
loadMoreBtn.addEventListener('click', loadMoreImages);
searchField.addEventListener('input', checkSearch);
