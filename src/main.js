import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const query = e.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.error({ message: 'Please enter a search query!' });
    return;
  }

  loader.classList.remove('hidden');
  clearGallery();

  fetchImages(query)
    .then(images => {
      renderGallery(images);
    })
    .catch(() => {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
});
