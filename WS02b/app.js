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

// Tiedostoon kirjoittaminen

const data = 'Tämä teksti on onnistuneesti kirjoitettu tiedostoon!';

fs.writeFile('output.txt', data, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  } else
  console.log('Kirjoittaminen tiedostoon onnistui!');
});

// Tiedoston poisto

fs.unlink('temp.txt', (err) => {
    if (err) {
        console.error(err);
        return;
    } else
    console.log(`Tiedosto poistettu onnistuneesti!`);
});

// Hakemiston luominen, muutetaan kommentiksi, jotta voidaan kokeilla hakemiston poistoa

//fs.mkdir('testDir', { recursive: true }, (err) => {
    //if (err) {
        //console.error(err);
       // return;
   // } else
   // console.log(`Hakemisto luotu onnistuneesti!`);
//});

// Hakemiston poistaminen

fs.rmdir('testDir', { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Hakemisto poistettu onnistuneesti!');
  }
});
