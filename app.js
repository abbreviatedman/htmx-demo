import express from "express";

import connectToMongoDB from "./db/mongodb.js";
import Pokemon from "./models/pokemonModel.js";
import axios from "axios";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(``);
});

app.get("/movies", async (req, res) => {
  const response = await axios(
    `https://api.themoviedb.org/3/search/movie?api_key=a4cae43902da506229d8148bcfc7364c&language=en-US&query=deadpool`
  );

  const movies = response.data.results;
  res.send(
    movies.map((movie) => ``).join(''))
});

app.get("/pokemon", async (req, res) => {
  const pokemons = await Pokemon.find({});
  res.send(``);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
  connectToMongoDB();
});
