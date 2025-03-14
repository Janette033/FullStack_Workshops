/* Harjoitus 1 koodi
const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    res.send('Contact Page');
});

app.get('/services', (req, res) => {
    res.send('Services Page');
});

app.use(express.static('public')); 

app.listen(port, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});
*/

// harjoitus 2, kaikille reiteille staattinen HTML-tiedosto
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});


// Harjoitus 3

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    res.json(requestBody);
  });


// Harjoitus 4 

const loggerMiddleware = (req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
  };

const customHeaderMiddleware = (req, res, next) => {
    if (!req.headers['x-custom-header']) {
      res.status(400).json({ error: 'X-Custom-Header puuttuu'});
      console.log('X-Custom-Header puuttuu')
    } else {
      next();
    }
  };

app.use(loggerMiddleware);

app.post('/testi', customHeaderMiddleware, (req, res) => {
  const requestBody = req.body;
  res.json(requestBody);
});
