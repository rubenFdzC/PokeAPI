const pokedex$$ = document.getElementById('pokedex');
const main$$ = document.querySelector("main");
// const searchBtn = document.getElementById('searchBtn');
// const searchInput = document.getElementById('searchInput');

//save all the charged objects
let allPokemon = [];
// Function to save the first 150 objects of the API 

async function fetchPokemon(){
    try {
        const sourceURL = "https://pokeapi.co/api/v2/pokemon/";
        for (let i = 1; i <= 150; i++) {
            // whith this loop we took the first 150 objects
            const response = await fetch(`${sourceURL}${i}`);
            const  data  = await response.json();
            console.log(data);
            // return response;
            // const pokemon = {
            //     name: data.name,
            //     image: data.sprites["front_default"],
            //     type: data.types.map((type) => type.type.map).join(", "),
            //     id: data.id,
            // };
            //Push to the array of all the pokemons the data rescued from de const pokemon inside the loop and then print that info

            // allPokemon.push(pokemon);
            // displayPokemon(pokemon);

        }

    } catch (error) {
        console.log(error);
    }
};
fetchPokemon(sourceURL)
// const init = async () => {
//     const pokemons = await get()
// }

// // The function to create the objects in block with class and then style them with CSS
// function displayPokemon(pokemon){
//     const PokemonCard = `
//     <div class = "card">
//     <div class="image-container">
//     img src="${pokemon.image}" alt="${pokemon.name}" />
//     </div>
//     <div class="info">
//     <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
//     <h3 class="name">${pokemon.name}</h3>
//     <small class ="type">Type: ${pokemon.type}</small>
//     </div>
//     </div>
//     ` ;
//    pokedex.insertAdjacentElement("beforeend", PokemonCard);
// }
// //filter elements by name
// function filterPokemon(term){
//     const searchTerm = term.toLowerCase(); //all lower letters to compare in the filter
//     const filteredPokemon = allPokemon.filter((pokemon) => {
//         return pokemon.name.toLowerCase().includes(searchTerm);
//     });
//     //clear list
//     pokedex.innerHTML = "";
//     //Print only element that coincide with the searched term
//     filteredPokemon.forEach((pokemon) => {
//         displayPokemon(pokemon);
//     });
// }
