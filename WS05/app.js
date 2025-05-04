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
}).then(() => {
    console.log("Yhdistetty MongoDB:hen");
}).catch((error) => {
    console.error("MongoDB-yhteysvirhe:", error);
    process.exit(1);  
});

// Schema ja Model kissaroduille
const KissarotuSchema = new mongoose.Schema({
    nimi: {
        type: String,
        required: [true, "Nimi on pakollinen"],
        minlength: [2, "Nimen on oltava vähintään 2 merkkiä"]
    },
    kuvaus: {
        type: String,
        required: [true, "Kuvaus on pakollinen"]
    },
    alkuperä: {
        type: String,
        required: [true, "Alkuperä on pakollinen"]
    },
    värit: {
        type: [String],
        required: [true, "Värit ovat pakollisia"],
        validate: {
            validator: (arr) => Array.isArray(arr) && arr.length > 0,
            message: "Värit-taulukko ei saa olla tyhjä"
        }
    }
});

const Kissarotu = mongoose.model("Kissarotu", KissarotuSchema);

// GET kaikki kissarodut
app.get("/api/getall", async (req, res) => {
    const kissarodut = await Kissarotu.find();
    res.json(kissarodut);
});

// GET yksittäinen kissarotu
app.get("/api/:id", async (req, res) => {
    try {
        const kissarotu = await Kissarotu.findById(req.params.id);
        kissarotu ? res.json(kissarotu) : res.status(404).json({ error: "Ei löytynyt" });
    } catch (error) {
        res.status(400).json({ error: "Virheellinen ID-muoto" });
    }
});

// POST uusi kissarotu
app.post("/api/add", async (req, res) => {
    const { nimi, kuvaus, alkuperä, värit } = req.body;
    if (!nimi || !kuvaus || !alkuperä || !värit || !Array.isArray(värit) || värit.length === 0) {
        return res.status(400).json({ message: "Kaikki kentät ovat pakollisia ja värit-taulukon täytyy olla vähintään yksi ja olla taulukko muodossa" });
    }
    try {
        const uusiKissarotu = new Kissarotu(req.body);
        const tallennettu = await uusiKissarotu.save();
        res.status(201).json({ message: "Kissarotu luotu", uusiKissarotu: tallennettu });
    } catch (error) {
        res.status(500).json({ message: "Virhe luotaessa kissarotua", error: error.message });
    }
});

// PUT päivitä kissarotu
app.put("/api/update/:id", async (req, res) => {
    const { nimi, kuvaus, alkuperä, värit } = req.body;

    if (!nimi || !kuvaus || !alkuperä || !värit || !Array.isArray(värit) || värit.length === 0) {
        return res.status(400).json({ message: "Kaikki kentät ovat pakollisia ja värit-taulukon täytyy sisältää vähintään yksi arvo ja olla taulukko muodossa" });
    }
    try {
        const päivitettyKissarotu = await Kissarotu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        päivitettyKissarotu ? res.json({ message: "Päivitetty onnistuneesti", päivitettyKissarotu }) :
            res.status(404).json({ error: "Kissarotu ei löytynyt" });
    } catch (error) {
        res.status(400).json({ error: "Virheellinen ID-muoto" });
    }
});

// DELETE poista kissarotu
app.delete("/api/delete/:id", async (req, res) => {
    try {
        const poistettuKissarotu = await Kissarotu.findByIdAndDelete(req.params.id);
        poistettuKissarotu ? res.json({ message: "Poistettu onnistuneesti" }) :
            res.status(404).json({ error: "Kissarotu ei löytynyt" });
    } catch (error) {
        res.status(400).json({ error: "Virheellinen ID-muoto" });
    }
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "Virheellinen JSON", details: err.message });
    }
    next(err); 
});
app.use((err, req, res, next) => {
    res.status(500).json({ error: "Sisäinen palvelinvirhe", details: err.message });
});

// Käynnistä palvelin
app.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa: http://localhost:${PORT}`);
});





