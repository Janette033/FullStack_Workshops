const fs = require('fs');  

const message = "Tiedoston kirjoittaminen onnistui!";

try {
  fs.writeFileSync('./output.txt', message, 'utf8');
  console.log('File written successfully!');
} catch (err) {
  console.error(err);
}