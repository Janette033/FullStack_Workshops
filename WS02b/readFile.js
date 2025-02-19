const fs = require('fs/promises'); 

async function readFileAsync() {
    try {
        const data = await fs.readFile('example.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error('Virhe luettaessa tiedostoa:', err);
    }
}

readFileAsync();
