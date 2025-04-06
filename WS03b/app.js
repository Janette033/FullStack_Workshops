const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const items = ['Kohta 1', 'Kohta 2', 'Kohta 3', 'Kohta 4'];
    const isLoggedIn = false;
    const users = [
        { name: 'Maija Mehiläinen', email: 'maija@example.com' },
        { name: 'Matti Meikäläinen', email: 'matti@example.com' },
        { name: 'Liisa Virtanen', email: 'liisa@example.com' }
      ];
    res.render('index', {message: 'Hello world!', items, isLoggedIn, users});
});

app.listen(PORT, () => {
    console.log(`Palvelin on käynnissä osoitteessa http://localhost:${PORT}`);
});