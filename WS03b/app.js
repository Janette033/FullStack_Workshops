// Tehtävä 1
const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const items = ['Kohta 1', 'Kohta 2', 'Kohta 3', 'Kohta 4'];
    const isLoggedIn = false;
    res.render('index', {message: 'Hello world!', items, isLoggedIn});

});

app.listen(PORT, () => {
    console.log(`Palvelin on käynnissä osoitteessa http://localhost:${PORT}`);
});