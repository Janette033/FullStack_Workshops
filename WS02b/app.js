// Axios pyyntö
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

// Tiedoston lukeminen

const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  } else
  console.log(data);
});
