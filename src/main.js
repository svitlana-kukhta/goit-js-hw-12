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
let totalPages = 1;
let currentQuery = '';
let lightbox;

fetchSearchBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();
  if (!searchQuery) {
    iziToast.show({ message: 'Please try again!' });
    return;
  }
  currentQuery = searchQuery;
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
  const imagesPerPages = 15;
  totalPages = Math.ceil(data.totalHits / imagesPerPages);

  renderImages(data.hits, gallery);
  
  lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  lightbox.refresh();

  if(currentPage < totalPages) {loadMoreBtn.style.display = 'block';} else {loadMoreBtn.style.display = 'none';}

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
    loader.style.display = 'none';
    
    if (!data.hits || data.hits.length === 0) {
      iziToast.show({ message: "No more images found." });
      loadMoreBtn.style.display = 'none';
      return
    };
      
    renderImages(data.hits, gallery);
    lightbox.refresh();
    scrollToNextGroup();

   if (currentPage < totalPages) {
      loadMoreBtn.style.display = 'block';      
    }
     
    else {
     iziToast.show({ message: "We're sorry, but you've reached the end of search results." });
      loader.style.display = 'none';
      loadMoreBtn.style.display = 'none';
    }
  
    } catch (error) {
    loader.style.display = 'none';
    loadMoreBtn.style.display = 'none';
    iziToast.error({ title: 'Error', message: 'Sorry, something went wrong. Please try again!' });
  }
}
)

    