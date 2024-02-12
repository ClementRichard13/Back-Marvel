require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Bienvenue sur le serveur" });
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Le serveur n'existe pas" });
});

app.listen(process.env.PORT, () => {
  console.log("Serveur is on fire 🔥🔥🔥🔥");
});
