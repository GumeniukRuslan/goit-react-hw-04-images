import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '35523628-8ab67868a338e2d72f9e83665',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 12,
  min_height: '180',
});

export async function apiFetch(searchQuery, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?${searchParams}&page=${page}&q=${searchQuery}`
  );
  return response;
}
