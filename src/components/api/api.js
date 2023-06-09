import Notiflix from 'notiflix';

const API_KEY = '35599387-daff3be7791dba4aa3b1a02ca';
const BASE_URL = 'https://pixabay.com/api';
export const PER_PAGE =12;

const searchParams = new URLSearchParams({
      key: API_KEY,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      per_page: PER_PAGE,
});

export const getImages = async (query, page = 1) => {
  try {
    const data = await fetch(
      `${BASE_URL}/?q=${query}&page=${page}&${searchParams}`,
    );

    const response = await data.json();
    return response;
  } catch (err) {
    Notiflix.Notify.failure("Something went wrong. Please try again.");
  }
};
