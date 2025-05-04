const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const collection = [
    { id: 1, name: "Document A" },
    { id: 2, name: "Document B" }
];

// GET kaikki dokumentit
app.get("/api/getall", (req, res) => {
    res.json(collection);
});

// GET 
app.get("/documents/:id", (req, res) => {
  const id = req.params.id;
  const doc = collection.find(d => d.id == id);
  if (doc) {
    res.json(doc);
  } else {
    res.status(404).json({ error: "Ei löytynyt" });
  }
});

// POST 
app.post("/api/add", (req, res) => {
    const newDocument = req.body;
    if (!newDocument.id || !newDocument.name) {
        return res.status(400).json({ error: "id ja name ovat pakollisia" });
    }
    const exists = collection.some(doc => doc.id == newDocument.id);
    if (exists) {
        return res.status(409).json({ error: "Dokumentti samalla ID:llä on jo olemassa" });
    }
    collection.push(newDocument);
    res.status(201).json({ message: "Dokumentti lisätty", newDocument });
});

// PUT/PATCH 
app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const index = collection.findIndex(doc => doc.id == id);
    if (index !== -1) {
        collection[index] = { ...collection[index], ...req.body };
        res.json({ message: `Dokumentti ${id} päivitetty`, updated: collection[index] });
    } else {
        res.status(404).json({ error: "Ei löytynyt" });
    }
});

// DELETE 
app.delete("/api/delete/:id", (req, res) => {
    const { id } = req.params;
    const index = collection.findIndex(doc => doc.id == id);
    if (index !== -1) {
        collection.splice(index, 1);
        res.json({ message: `Dokumentti ${id} poistettu` });
    } else {
        res.status(404).json({ error: "Ei löytynyt" });
    }
});

// Käynnistetään palvelin
app.listen(PORT, () => {
    console.log(`Palvelin on käynnissä osoitteessa: http://localhost:${PORT}`);
});

