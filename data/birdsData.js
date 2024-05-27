import axios from 'axios';

const fetchBirdsData = async () => {
  try {
    const response = await axios.get('https://freetestapi.com/api/v1/birds');
    const allBirds = response.data;
    return allBirds;
  } catch (error) {
    console.error('Error fetching birds data:', error);
    return [];
  }
};

const getAllBirds = async () => {
  const allBirds = await fetchBirdsData();
  return allBirds;
};

export { getAllBirds };
