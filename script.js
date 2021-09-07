const baseURL = "https://pokeapi.co/api/v2/pokemon-species/";

let page = 1;

let list = document.getElementById("pokedex");

let getThePokemon = (number) => {
    fetch(baseURL + number)
        .then(response => response.json())
        .then(pokemon => displayPokemon(pokemon))
}

let displayPokemon = (pokemonJSON) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = pokemonJSON.name;
    list.appendChild(listItem);
}

window.onload = function () {
    for (i = 1; i <= 10; i++) { //898 pokemon, load first 10 cuz that's a lot
        getThePokemon(i);
    }
}