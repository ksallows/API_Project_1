
//pokemon-species endpoint contains flavor text (pokdedex)
//pokemon endpoint contains type info
const baseURLSpecies = "https://pokeapi.co/api/v2/pokemon-species/";
const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const pokedex = document.getElementById("pokedex");
const loadMoreButton = document.getElementById("load");

let imageUrl = (pokemonName) => `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`;

//pokemon with forms that make the image fetch by url not work
const exceptions = {
    eiscue: "eiscue-ice",
    lycanroc: "lycanroc-midday",
    urshifu: "urshifu-single-strike",
    morpeko: "morpeko-full-belly",
    giratina: "giratina-altered",
    wishiwashi: "wishiwashi-solo",
    shaymin: "shaymin-land",
    oricorio: "oricorio-baile"
}

let checkNameForURL = (pokemonName) => Object.keys(exceptions).includes(pokemonName) ? exceptions[pokemonName] : pokemonName

let randomPokemonNumber = () => {
    let min = Math.ceil(1);
    let max = Math.floor(898);
    return Math.floor(Math.random() * (max - min) + min);
}

//get JSON species data with flavor text
let getThePokemon = (number) => {
    fetch(baseURLSpecies + number, { mode: "cors" })
        .then(response => response.json())
        .then(pokemon => displayPokemon(pokemon))
        .catch(error => console.log(error))
}

//api has pokdedex entries in different languages but not always english first!
let getTheEnglishFlavorText = (pokemonJSON) => {
    for (i = 0; i < Object.keys(pokemonJSON).length; i++) {
        if (pokemonJSON[i].language.name == "en") {
            return pokemonJSON[i].flavor_text;
        }
    }
}

//get JSON pokemon data with type of default form
let lookUpType = async (pokemonName) => {
    await fetch(baseURL + pokemonName, { mode: "cors" })
        .then(response => response.json())
        .then(pokemon => type(pokemon))
        .catch(error => console.log(error))
}

let type = (pokemonJSON) => {
    if (pokemonJSON.types.length == 2) {
        console.log([pokemonJSON.types[0].type["name"], pokemonJSON.types[1].type["name"]]);
        return [pokemonJSON.types[0].type["name"], pokemonJSON.types[1].type["name"]];
    }
    else {
        return pokemonJSON.types[0].type["name"];
    }
}

let displayPokemon = async (pokemonJSON) => {
    let pokemonName = pokemonJSON.name;
    let pokemonType = await lookUpType(pokemonName);
    console.log(pokemonType);

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

    //<span class="badge">
    let typeBadge = document.createElement("span");
    typeBadge.classList.add("badge");
    if (typeof pokemonType == "string") {
        typeBadge.innerHTML = pokemonType;
        typeBadge.classList.add(pokemonType + "-type")
    }
    // else {
    //     typeBadge.innerHTML = pokemonType[0];
    //     typeBadge.classList.add(pokemonType[0] + "-type")
    //     typeBadge.classList.add(pokemonType[1] + "-type")
    // }
    cardTitle.appendChild(typeBadge);

    // <image class="card-img-top">
    let image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = imageUrl(checkNameForURL(pokemonName));

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
})