import express from "express";

import connectToMongoDB from "./db/mongodb.js";
import Pokemon from "./models/pokemonModel.js";
import axios from "axios";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>HTMX Essentials</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.png" />
        <script src="https://unpkg.com/htmx.org@2.0.1" defer></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <header id="main-header">
          <h1>Deadpool Movies</h1> <h1>Pokemon</h1>
        </header>

        <main>
          <h3>Choose movies or pokemon to get started!</h3>
        </main>
      </body>
    </html>
  `);
});

app.get("/movies", async (req, res) => {
  const response = await axios(
    `https://api.themoviedb.org/3/search/movie?api_key=a4cae43902da506229d8148bcfc7364c&language=en-US&query=deadpool`
  );

  const movies = response.data.results;
  res.send(
    movies.map((movie) => `
  <div class="card mt-3 mb-5 w-75">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}" class="card-img
          img-fluid">
        </div>

        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title">
              ${ movie["original_title"] }
            </h2>
            <hr>
            <p class="card-text">
              ${ movie["overview"] }
            </p>
            <hr>
            <br>

            <p class="card-text"><b>Date Published:</b>
              ${ movie["release_date"] }
            </p>

            <p class="card-text"><b>Total Votes:</b>
              ${ movie["vote_count"] }
            </p>

            <p class="card-text"><b>Average Rating:</b>
              ${ movie["vote_average"] }
            </p>

          </div>
        </div>

      </div>
    </div>
`).join(''))
});

app.get("/pokemon", async (req, res) => {
  const pokemons = await Pokemon.find({});
  res.send(`
<h3>Here are all the pokemons:</h3>
${pokemons
  .map((pokemon) => {
    return `
    <h5>Pokedex No. ${pokemon.PokedexNo}</h5>
    <p>Name: ${pokemon.Name}</p>
    <p>Type: ${pokemon.Type}</p>
    Moves:
    <ul>
      ${pokemon.Moves.map((move) => `<li>${move}</li>`).join("")}
    </ul>
  `;
  })
  .join("")}`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
  connectToMongoDB();
});
