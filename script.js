const baseURL = "https://pokeapi.co/api/v2/pokemon-species/";

let increment;

const list = document.getElementById("pokedex");

const loadMoreButton = document.getElementById("load");

let getThePokemon = (number) => {
    fetch(baseURL + number)
        .then(response => response.json())
        .then(pokemon => displayPokemon(pokemon))
        .catch(error => console.log(error))
}

let displayPokemon = (pokemonJSON) => {
    let listItem = document.createElement("li");
    let header = document.createElement("h3")
    header.innerHTML = pokemonJSON.name;
    list.appendChild(listItem);
    listItem.appendChild(header);
}

let loadMore = () => {
    for (i = 1; i <= 10; i++) {
        getThePokemon(increment);
        increment++
    }
}

window.addEventListener("DOMContentLoaded", () => {
    loadMoreButton.addEventListener("click", loadMore);
    for (i = 1; i <= 10; i++) { //898 pokemon, load first 10 cuz that's a lot
        getThePokemon(i);
    }
    increment = 10;
})