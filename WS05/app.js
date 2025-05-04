const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Yhdistää MongoDB, poistettu käyttäjänimi ja salasana näkyvistä mutta yhteys on testattu onnistuneesti
mongoose.connect("mongodb+srv://@cluster0.dydf9dt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema ja Model
const DocumentSchema = new mongoose.Schema({
    name: String,
    content: String
});
const Document = mongoose.model("Document", DocumentSchema);

// GET kaikki dokumentit
app.get("/api/getall", async (req, res) => {
    const documents = await Document.find();
    res.json(documents);
});

// GET
app.get("/api/:id", async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        document ? res.json(document) : res.status(404).json({ error: "Ei löytynyt" });
    } catch (error) {
        res.status(400).json({ error: "Virheellinen ID-muoto" });
    }
});

// POST
app.post("/api/add", async (req, res) => {
    const newDocument = new Document(req.body);
    await newDocument.save();
    res.status(201).json({ message: "Dokumentti luotu", newDocument });
});

// PUT
app.put("/api/update/:id", async (req, res) => {
    try {
        const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        updatedDocument ? res.json({ message: "Päivitetty onnistuneesti", updatedDocument }) :
            res.status(404).json({ error: "Dokumenttia ei löytynyt" });
    } catch (error) {
        res.status(400).json({ error: "Virheellinen ID-muoto" });
    }
});

// DELETE
app.delete("/api/delete/:id", async (req, res) => {
    try {
        const deletedDocument = await Document.findByIdAndDelete(req.params.id);
        deletedDocument ? res.json({ message: "Poistettu onnistuneesti" }) :
            res.status(404).json({ error: "Dokumenttia ei löytynyt" });
    } catch (error) {
        res.status(400).json({ error: "Virheellinen ID-muoto" });
    }
});

// Käynnistä palvelin 
app.listen(PORT, () => {
    console.log(`Palvelin käynissä osoitteessa: http://localhost:${PORT}`);
});



