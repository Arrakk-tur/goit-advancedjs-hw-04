import axios from 'axios';

const API_KEY = '46833359-edc83954567fc8c41d0a60462';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    if (response.data.hits.length === 0) {
      throw new Error('No images found');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}
