import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let query = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  query = e.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.error({ message: 'Please enter a search query!' });
    return;
  }

  page = 1;
  loader.classList.remove('hidden');
  loadMoreButton.classList.add('hidden');
  clearGallery();

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;
    renderGallery(data.hits);
    if (data.hits.length < 15 || data.hits.length === totalHits) {
      loadMoreButton.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreButton.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } finally {
    loader.classList.add('hidden');
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits);

    if (page * 15 >= totalHits) {
      loadMoreButton.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    // Плавне прокручування сторінки
    const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({ message: 'Failed to load more images.' });
  } finally {
    loader.classList.add('hidden');
  }
});
