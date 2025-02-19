const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Virhe luettaessa tiedostoa:', err);
        return;
    }
    console.log(data);
});
