const main$$ = document.querySelector("main")
const pokemonContainer = document.querySelector(".container");
// console.log(main$$);

const fetchPokemon= async () => {
    try {
        const sourceURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    for ( let i = 1 ; i <= 150 ; i++){
        // whith this loop we took the first 150 objects
        const response = await fetch(`${sourceURL}${i}/`);
        const {data} = await response.json();
        console.log(data);
    }
}catch (error) {
    console.log(error);
}
};
// const mapear = (pokemons) => {
//     // console.log(characters);
//     return pokemons.map((pokemon)=>({
//         id: character.id,
//         imagen: pokemon.image,
//         nombre: pokemon.name,
//         origen: pokemon.origin,
//         rol: pokemon.role,
//     }))
// }
// const pintar = (pokemons) => {
//     main$$.innerHTML=""
//     for (const pokemon of pokemons) {
//         const pokemonDiv$$ = document.createElement("div")
//         pokemonDiv$$.innerHTML =`
//         <div class="main__div">
//         <h2>${pokemon.name}</h2>
//         <img src="${pokemon.imagen}" alt="${pokemon.name}">
//         <p>${pokemon.rol}</p>
//         </div>
//         `
//         main$$.appendChild(characterDiv$$)
//     }
// }