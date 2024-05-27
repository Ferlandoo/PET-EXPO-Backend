import axios from 'axios';

const fetchCatsData = async () => {
  try {
    const response = await axios.get('https://freetestapi.com/api/v1/cats');
    const allCats = response.data;
    return allCats;
  } catch (error) {
    console.error('Error fetching cats data:', error);
    return [];
  }
};

const getAllCats = async () => {
  const allCats = await fetchCatsData();
  return allCats;
};

export { getAllCats };
