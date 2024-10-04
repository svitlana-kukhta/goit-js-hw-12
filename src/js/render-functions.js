'use strict';

/**
 * Функція для відображення зображень у галереї
 * @param {Array} hits - масив зображень
 * @param {HTMLElement} gallery - контейнер для зображень
 */


export function renderImages(images, galleryElement) {
    const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <div class="photo-card">
          <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" width="300" loading="lazy"/>
        </a>
        <ul class="info">
          <li class="info-item">
            <p>Likes</p>
            <span class="info-value">${likes}</span>
          </li>
          <li class="info-item">
            <p>Views</p>
            <span class="info-value">${views}</span>
          </li>
          <li class="info-item">
            <p>Comments</p>
            <span class="info-value">${comments}</span>
          </li>
          <li class="info-item">
            <p>Downloads</p>
            <span class="info-value">${downloads}</span>
          </li>
        </ul>
      </div>`
    )
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}