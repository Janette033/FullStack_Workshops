// Tehtävä 1
const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {message: 'Hello world!'});
});

app.listen(PORT, () => {
    console.log(`Palvelin on käynnissä osoitteessa http://localhost:${PORT}`);
});