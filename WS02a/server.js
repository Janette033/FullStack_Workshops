const http = require('http'); // Tuodaan http-moduuli

const host = 'localhost';
const port = 3000;

// Luodaan requestListener funktio
const requestListener = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); 

    // Reitti palauttaa "Hello, World!"
    if (req.url === '/') {
        res.end('Hello, World!');
    }
    // Reitti palauttaa "About Page"
    else if (req.url === '/about') {
        res.end('About Page');
    }
    // Reitti palauttaa "Contact Page"
    else if (req.url === '/contact') {
        res.end('Contact Page');
    }
};

// Luodaan palvelin
const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Palvelin käynnissä osoitteessa http://${host}:${port}`);
});
