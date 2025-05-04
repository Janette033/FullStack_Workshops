# Kissarodut REST API
Tämä on Node.js + Express + MongoDB -pohjainen REST API kissarotujen hallintaan. 
Sovellus mahdollistaa kissarotujen lisäämisen, hakemisen, päivittämisen ja poistamisen. 
Tietokannassa kukin kissarotu sisältää nimen, kuvauksen, alkuperän ja listan värejä.

# API-reitit

## GET kaikki kissarodut
URL: /api/getall
Metodi: GET
Vastaus:
[
  {
    "_id": "665123abc123",
    "nimi": "Birma",
    "kuvaus": "Pitkäkarvainen ja rauhallinen",
    "alkuperä": "Burma",
    "värit": ["valkoinen", "ruskea"]
  }
]
## GET yksi kissarotu
URL: /api/:id
Metodi: GET
Parametrit: id – MongoDB ID
Vastaus:
{
  "_id": "665123abc123",
  "nimi": "Birma",
  "kuvaus": "Pitkäkarvainen ja rauhallinen",
  "alkuperä": "Burma",
  "värit": ["valkoinen", "ruskea"]
}

Virheellinen ID:
{
  "error": "Virheellinen ID-muoto"
}

## POST uusi kissarotu
URL: /api/add
Metodi: POST
Body (JSON):
{
  "nimi": "Persialainen",
  "kuvaus": "Pitkäkarvainen sisäkissa",
  "alkuperä": "Iran",
  "värit": ["valkoinen", "harmaa"]
}
Vastaus:
{
  "message": "Kissarotu luotu",
  "uusiKissarotu": {
    "_id": "665456def456",
    "nimi": "Persialainen",
    ...
  }
}
Virheellinen syöte:
{
  "message": "Kaikki kentät ovat pakollisia ja värit-taulukon täytyy sisältää vähintään yksi arvo ja olla taulukko muodossa"
}

## PUT päivitä kissarotu
URL: /api/update/:id
Metodi: PUT
Body (JSON):
{
  "kuvaus": "Päivitetty kuvaus"
}
Vastaus:
{
  "message": "Päivitetty onnistuneesti",
  "päivitettyKissarotu": {
    "_id": "665123abc123",
    "kuvaus": "Päivitetty kuvaus"
  }
}
Virheellinen ID:
{
  "error": "Virheellinen ID-muoto"
}

## DELETE kissarotu
URL: /api/delete/:id
Metodi: DELETE
Vastaus:
{
  "message": "Poistettu onnistuneesti"
}
Virheellinen ID tai ei löydy:
{
  "error": "Kissarotu ei löytynyt"
}

# Virheenkäsittely
400 Bad Request – puuttuvat/muotoiltu väärin olevat kentät tai JSON

404 Not Found – resurssia ei löydy annetulla ID:llä

500 Internal Server Error – palvelinvirhe tai MongoDB-virhe

