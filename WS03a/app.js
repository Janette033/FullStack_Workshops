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
/*
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/
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

// Harjoitus 5

const fs = require('fs');

app.get('/list', (req, res) => {
    const filePath = path.join(__dirname, 'data.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error("Virhe tiedoston lukemisessa:", err);
        res.status(500).send('Error reading file');
      } else {
        res.send(data);
      }
    });
  });

app.get("/json", (req, res) => {
    const filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error JSON tiedoston lukemisessa:", err);
        return res.status(500).send("Error JSON tiedoston lukemisessa");
      }
  
      try {
        const jsonData = JSON.parse(data);
  
        let html = `<table border="1" cellspacing="0" cellpadding="10">
                      <tr>
                        <th>Nimi</th>
                        <th>Ikä</th>
                        <th>Kaupunki</th>
                      </tr>`;
  
        jsonData.forEach((item) => {
          html += `<tr>
                     <td>${item.name}</td>
                     <td>${item.age}</td>
                     <td>${item.city}</td>
                   </tr>`;
        });
  
        html += `</table>`;
  
        res.send(html);
      } catch (parseError) {
        console.error("Error JSON datan parsimisessa", parseError);
        res.status(500).send("Error JSON datan parsimisessa");
      }
    });
  });

app.post('/add', (req, res) => {
  const newUser = req.body;
  const filePath = path.join(__dirname, "data.json");

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error("Error JSON tiedoston lukemisessa:", err);
          return res.status(500).send("Error JSON tiedoston lukemisessa");
      }

      try {
          let users = JSON.parse(data);
          users.push(newUser);

          fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
              if (err) {
                  console.error("Error JSON tiedoston kirjoittamisessa:", err);
                  return res.status(500).send("Error JSON tiedoston kirjoittamisessa");
              }
              res.status(201).json(users);
          });

      } catch (error) {
          console.error("Virhe JSON-parsinnassa:", error);
          return res.status(500).send("Virhe JSON-datan käsittelyssä");
      }
  });
});