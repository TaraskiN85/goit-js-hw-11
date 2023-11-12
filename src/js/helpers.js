import { Notify } from 'notiflix';

export const showSuccess = message => {
  Notify.success(`${message}`, {
    timeout: 1500,
  });
};

export const showFailure = (
  message = 'Sorry, there are no images matching your search query. Please try again.',
  params = { timeout: 1500, position: 'center-top', distance: '100px' }
) => {
  Notify.failure(`${message}`, params);
};

export const smoothScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 0.5,
    behavior: 'smooth',
  });
};
