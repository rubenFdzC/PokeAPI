const container$$ = document.querySelector(".container");
const buttons$$ = document.getElementById("buttons");
const previous$$ = document.querySelector("#previous");
const next$$ = document.querySelector("#next");

let offset = 0;
let limit = 20;
let pokemons = [];

async function fetchPokemons(offset, limit) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();

    for (const pokemon of data.results) {
      const pokemonData = await fetchPokemonData(pokemon.url);
      createPokemon(pokemonData);
      pokemons.push(pokemonData);
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchPokemonData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function createPokemon(pokemon) {
  const flipCard$$ = document.createElement("div");
  flipCard$$.classList.add("flipCard");

  const cardContainer$$ = document.createElement("div");
  cardContainer$$.classList.add("cardContainer");

  flipCard$$.appendChild(cardContainer$$);

  const card$$ = document.createElement("div");
  card$$.classList.add("pokemonCard");

  const imageContainer$$ = document.createElement("div");
  imageContainer$$.classList.add("imageContainer");
  card$$.appendChild(imageContainer$$);

  const image$$ = document.createElement("img");
  image$$.src = pokemon.sprites.front_default;

  imageContainer$$.appendChild(image$$);

  const numberId$$ = document.createElement("p");
  numberId$$.textContent = `#${pokemon.id /*.toString()*/}`;

  card$$.appendChild(numberId$$);

  const name$$ = document.createElement("p");
  name$$.classList.add("pokemonName");
  name$$.textContent = pokemon.name;
  card$$.appendChild(name$$);

  const cardBack$$ = document.createElement("div");
  cardBack$$.classList.add("pokemon-block-back");

cardBack$$.appendChild(progressBars(pokemon.stats));

  cardContainer$$.appendChild(cardBack$$);
  cardContainer$$.appendChild(card$$);

  container$$.appendChild(flipCard$$);
}

function progressBars(stats) {
    const statsContainer$$ = document.createElement("div");
    statsContainer$$.classList.add("statsContainer");
    for (let i = 0; i < 5; i++) {
      const stat = stats[i];
      const statpercent$$ = stat.base_state / 2 + "%";
      const statContainer$$ = document.createElement("div");
      statContainer$$.classList.add("statContainer");
      const statName$$ = document.createElement("div");
      statName$$.textContent = stat.stat.name;
      const progress$$ = document.createElement("div");
      progress$$.classList.add("progress");
      const progressBar$$ = document.createElement("div");
      progressBar$$.classList.add("progressBar");
      progressBar$$.setAttribute("aria-valuenow", stat.base_stat);
      progressBar$$.setAttribute("aria-valuemin", 0);
      progressBar$$.setAttribute("aria-valuemax", 200);
      progressBar$$.style.width = statpercent$$;
      progress$$.appendChild(progressBar$$);
      statContainer$$.appendChild(statName$$);
      statContainer$$.appendChild(progress$$);
  
      statsContainer$$.appendChild(statContainer$$);
    }
    
    return statsContainer$$;
  }
// in this case we took 20 for the first try and then we will create 2 buttons to show the other pages until bring the 150 first
fetchPokemons(offset, limit);

//Remove the older page to only show the new one
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//Buttons with the limits to 150 pokemons
previous$$.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 20;
    removeChildNodes(container$$); //poner esto antes para eliminar y luego solicitar los nuevos
    fetchPokemons(offset, limit);
  }
});
next$$.addEventListener("click", () => {
  if (limit == 150) {
    removeChildNodes(container$$);
  }
  offset += 20;
  removeChildNodes(container$$);
  fetchPokemons(offset, limit);
});

//Here we create de searcher for the items with de name

function searchPokemon() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const pokemonCards = document.querySelectorAll(".flipCard");

  pokemonCards.forEach((card) => {
    const pokemonName = card
      .querySelector(".pokemonName")
      .textContent.toLowerCase();

    if (pokemonName.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
const searchBtn$$ = document.getElementById("search-btn");
searchBtn$$.addEventListener("click", searchPokemon);
