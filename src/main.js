'use strict';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';

const searchInput = document.querySelector('#search-input');
const fetchSearchBtn = document.querySelector('.btn');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');


let currentPage = 1;
let currentQuery = '';
let lightbox;

fetchSearchBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();
  if (!searchQuery) {
    iziToast.show({ message: 'Please try again!' });
    return;
  }
  currentPage = 1;
  clearGallery(gallery);
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none';
try {
  const data = await fetchImages(searchQuery, currentPage);
  console.log(data);
  loader.style.display = 'none';

  if (!data.hits || data.hits.length === 0) {
    iziToast.show({ message: 'No images found for your query. Please try another search.' });
    return;
  }
    
  renderImages(data.hits, gallery);
  loadMoreBtn.style.display = 'block';
  lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  lightbox.refresh();
  searchInput.value = '';
}
catch (error) { console.error('Error fetching images:', error);
  loader.style.display = 'none';
  iziToast.error({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!' });
}
});

function scrollToNextGroup() {
  const { height: cardHeight } = document.querySelector('.gallery a').getBoundingClientRect();
  window.scrollBy({top: cardHeight * 2,
                  behavior: 'smooth',
  });
}

loadMoreBtn.addEventListener('click', async () => {
  loader.style.display = 'block';
  currentPage += 1; 
 
  try {
    const data = await fetchImages(currentQuery, currentPage);
    console.log('Response received from API:', data);
    
    if (data.hits && data.hits.length > 0) {
      renderImages(data.hits, gallery);
      loader.style.display = 'none';
      lightbox.refresh();
      scrollToNextGroup();
    } else {
      iziToast.show({ message: "We're sorry, but you've reached the end of search results." });
      loadMoreBtn.style.display = 'none';
    }
    } catch (error) {
    iziToast.error({ title: 'Error', message: 'Sorry, something went wrong. Please try again!' });
  }
})

    
