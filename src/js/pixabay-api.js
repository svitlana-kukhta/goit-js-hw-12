'use strict';
import axios from 'axios';
const API_KEY = '46284520-d906981dc6cb4e25f7cb86bba';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;
/**
 * Функція для отримання зображень з Pixabay
 * @param {string} searchQuery - запит для пошуку
 * @param {number} page - номер сторінки для пагінації (за замовчуванням 1)
 * @param {number} perPage - кількість зображень на сторінку (за замовчуванням 15)
 * @returns {Promise} - обіцянка, що повертає дані з Pixabay
 */
export async function fetchImages(searchQuery) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15, 
    page: currentPage, 
  });

  const url = `${ BASE_URL }?${ searchParams.toString()}`;
  try {
    const response = await axios.get(url);
    return response.data;}
  catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}


