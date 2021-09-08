const baseURL = "https://pokeapi.co/api/v2/pokemon-species/";

const pokedex = document.getElementById("pokedex");
const loadMoreButton = document.getElementById("load");

let imageUrl = (pokemonName) => `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`;

let randomPokemonNumber = () => {
    let min = Math.ceil(1);
    let max = Math.floor(898);
    return Math.floor(Math.random() * (max - min) + min);
}

let getThePokemon = (number) => {
    fetch(baseURL + number, { mode: "cors" })
        .then(response => response.json())
        .then(pokemon => displayPokemon(pokemon))
        .catch(error => console.log(error))
}

let getTheEnglishFlavorText = (pokemonJSON) => { // api has pokdedex entries in different languages but not always english first!!! why
    for (i = 0; i < Object.keys(pokemonJSON).length; i++) {
        if (pokemonJSON[i].language.name == "en") {
            return pokemonJSON[i].flavor_text;
        }
    }
}

let displayPokemon = (pokemonJSON) => {
    let pokemonName = pokemonJSON.name;

    // <div class ="card">
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("mx-1");
    card.classList.add("my-1");

    // <div class="card-body">
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // <h5 class="card-title">
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = pokemonName;

    // <image class="card-img-top">
    let image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = imageUrl(pokemonName)

    // <p class="card-text">
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerHTML = getTheEnglishFlavorText(pokemonJSON.flavor_text_entries);

    pokedex.appendChild(card);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
}

let loadMore = () => {
    for (i = 1; i <= 14; i++) {
        getThePokemon(randomPokemonNumber());
    }
}

window.addEventListener("DOMContentLoaded", () => {
    loadMoreButton.addEventListener("click", loadMore);
    for (i = 1; i <= 14; i++) {
        getThePokemon(randomPokemonNumber());
    }
    displayPokemon;
})