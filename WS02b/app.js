const axios = require('axios');
const apiUrl = 'https://reqres.in/api/users?page=2';

const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();
