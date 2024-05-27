import axios from 'axios';

const fetchDogsData = async () => {
  try {
    const response = await axios.get('https://freetestapi.com/api/v1/dogs');
    const allDogs = response.data;
    return allDogs;
  } catch (error) {
    console.error('Error fetching dogs data:', error);
    return [];
  }
};

const getAllDogs = async () => {
  const allDogs = await fetchDogsData();
  return allDogs;
};

export { getAllDogs };
