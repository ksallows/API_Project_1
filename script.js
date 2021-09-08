const baseURL = "https://pokeapi.co/api/v2/pokemon-species/";

let increment;

const list = document.getElementById("pokedex");
const listItem = document.createElement("li");
const header = document.createElement("h3")
const loadMoreButton = document.getElementById("load");

let listCollection = [];

let getThePokemon = (number) => { //api call
    fetch(baseURL + number, { mode: "cors" })
        .then(response => response.json())
        .then(pokemon => populatePokemon(pokemon))
        .catch(error => console.log(error))
}

let populatePokemon = (pokemonJSON) => { //populate the list of pokemon since they don't come in order from the api
    let pokemonObj = {
        name: pokemonJSON.name,
        id: pokemonJSON.id,
    }
    listCollection.push(pokemonObj);
}

let displayPokemon = () => { //display the collection on the page
    for (i = 1; i <= 10; i++) {
        header.innerHTML = listCollection[(i - 1)];
        list.appendChild(listItem);
        listItem.appendChild(header);
    }
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
    displayPokemon;
    console.log(listCollection);
})