require("dotenv").config();
const express = require("express");
// const { dirname } = require("path");
const app = express();
const port = process.env.PORT  || 3000;
const path = require("path");

// const { send } = require("express/lib/response");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded());

const pokedex = [
    {
        id: 1,
        numero: "001",
        nome: "Bulbasaur",
        descricao: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
        tipo: "Grass",
        altura: "0.7 m",
        peso: "6.9 kg",
        categoria: "Seed",
        habilidade: "Overgrow",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    },

    {
        id: 2,
        numero: "004",
        nome: "Charmander",
        descricao: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
        tipo: "Fire",
        altura: "0.6 m",
        peso: "8.5 kg",
        categoria: "Lizard",
        habilidade: "Blase",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    },

    {
        id: 3,
        numero: "007",
        nome: "Squirtle",
        descricao: "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
        tipo: "Water",
        altura: "0.5 m",
        peso: "9.0 kg",
        categoria: "Tiny Turtle",
        habilidade: "Torrent",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    }
    
];

let pokemon = undefined;

app.get("/", (req, res) => {    
    res.render("index", {pokedex, pokemon});
});

app.get("/cadastro", (req, res) => {
    res.render("cadastro", {pokedex, pokemon});
});

app.get("/detalhes", (req, res) => {
    res.render("detalhes", {pokedex, pokemon});
});

app.post("/create", (req, res) => {
    const pokemon = req.body;
    pokemon.id = pokedex.length + 1;
    pokedex.push(pokemon);
    res.redirect("/#cards");
});

app.get("/editar/:id", (req, res) => {
    const id = +req.params.id;
    pokemon = pokedex.find((pokemon) => pokemon.id === id);
    res.redirect("/cadastro");
});

app.post("/update/:id", (req, res) => {
    const id = +req.params.id - 1;
    const newPokemon = req.body;
    newPokemon.id = id + 1;
    pokedex[id] = newPokemon;
    pokemon = undefined;
    res.redirect("/detalhes");
});

app.get("/delete/:id", (req, res) => {
    const id = +req.params.id - 1;
    pokedex.splice(id, 1);
    res.redirect("/detalhes");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
