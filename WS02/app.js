console.log("Hei, Node.js!");

const math = require('./math');
const stringUtils = require('./stringUtils');
const dateUtils = require('./dateUtils');

// math.js funktio
const summa = math.lisää(10, 5);
const erotus = math.vähennä(10, 5);

// stringUtils.js funktio
const isotKirjaimet = stringUtils.isotKirjaimet('Hei');
const merkkijononKaantaminen = stringUtils.merkkijononKaantaminen('Mitä kuuluu');

// dateUtils.js funktio
const nykyinenPaiva = dateUtils.nykyinenPaiva();
const muotoiltuPaivamaara = dateUtils.muotoilePaivamaara(nykyinenPaiva);

// Kirjaa tulokset konsoliin
console.log('Yhteenlasku: ', summa);
console.log('Vähennyslasku: ', erotus);
console.log('Mekkijono isoilla kirjaimilla: ', isotKirjaimet);
console.log('Käännetty merkkijono: ', merkkijononKaantaminen);
console.log('Nykyinen päivämäärä: ', muotoiltuPaivamaara);