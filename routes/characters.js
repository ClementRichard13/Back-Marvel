const express = require("express");
const router = express.Router();
const axios = require("axios");

// une route pour récupérer les personnages
router.get("/characters", async (req, res) => {
  try {
    //  - paramètre de recherche (nom)
    // console.log(req.query.name);

    let query = `apiKey=${process.env.MARVEL_API_KEY}`;

    if (req.query.name) {
      query = query + `&name=${req.query.name}`;
    }
    if (req.query.page) {
      query = query + `&skip=${(req.query.page - 1) * 100}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${query}`
    );
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// une route pour avoir les détails d'un personnage

router.get("/characters/:characterId", async (req, res) => {
  // const characterId = req.params.characterId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${query}`
    );
    res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
