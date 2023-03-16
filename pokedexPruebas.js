const container$$ = document.querySelector(".container");
const buttons$$ = document.getElementById("buttons");
const previous$$ = document.querySelector("#previous");
const next$$ = document.querySelector("#next");

let offset = 0;
let limit = 20;
let pokemons = [];
 
//Bring the Json and save info the info of Pokemondata in a free array , the with se second function , take the json in data with the info of the pokemomns 
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
//This is de function to put all the info of the pokemons into cards to print and show 
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
    numberId$$.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
  
    card$$.appendChild(numberId$$);
  
    const name$$ = document.createElement("p");
    name$$.classList.add("pokemonName");
    name$$.textContent = pokemon.name;
    card$$.appendChild(name$$);
  
    const cardBack$$ = document.createElement("div");
    cardBack$$.classList.add("pokemon-block-back");
  
    const statsContainer$$ = progressBars(pokemon.stats); // Llama a la función progressBars() para crear el elemento con las estadísticas
    cardBack$$.appendChild(statsContainer$$); // Agrega el elemento con las estadísticas a la tarjeta
  
    cardContainer$$.appendChild(cardBack$$); // Agrega la tarjeta posterior a la tarjeta
    cardContainer$$.appendChild(card$$);
  
    container$$.appendChild(flipCard$$);
  }
//Function of the reverse of the card to bring and print de bars of other info 
function progressBars(stats) {
    const statsContainer$$ = document.createElement("div");
    statsContainer$$.classList.add("statsContainer");
    for (let i = 0; i < 5; i++) {
      const stat = stats[i];
      const statpercent$$ = stat.base_stat / 2 + "%";
      const statContainer$$ = document.createElement("div");
      statContainer$$.classList.add("statContainer");
      const statName$$ = document.createElement("div");
      statName$$.textContent = stat.stat.name;
      const progress$$ = document.createElement("div");
      progress$$.classList.add("progress-bar-container");
      const progressBar$$ = document.createElement("div");
      progressBar$$.classList.add("progress-bar");
      progressBar$$.setAttribute("aria-valuenow", stat.base_stat);
      progressBar$$.setAttribute("aria-valuemin", 0);
      progressBar$$.setAttribute("aria-valuemax", 200);
      progressBar$$.style.width = statpercent$$;
      progress$$.appendChild(progressBar$$);
      statContainer$$.appendChild(statName$$);
      statContainer$$.appendChild(progress$$);
  
      statsContainer$$.appendChild(statContainer$$);

//       const statsContainer$$ = progressBars(pokemon.stats);
// cardBack$$.appendChild(statsContainer$$);

    }
  
    return statsContainer$$;
  }
 

// in this case we took 20 for the first try and then we will create 2 buttons to show the other pages until bring the 150 first
fetchPokemons(offset, limit);

//Remove the older page to only show the new one clicking in the buttons of below
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//Buttons with the limits to 150 pokemons to show in pages 
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

//Here we create de searcher for the items with de name and put it in the header of the HTML 

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
