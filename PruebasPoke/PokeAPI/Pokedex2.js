const list_pokemons$$ = document.getElementById("container");
const buttons$$ = document.getElementById("buttons");
let URLpokemon = "https://pokeapi.co/api/v2/pokemon";
let btnNext;
let btnBack;
let templateHTML;

const GetPokemons = async (URLpokemon) => {
    try {
        const response = await fetch(URLpokemon);
        const result = await response.json();
        console.log(result);
        dataPokemons(result.results)
    } catch (error) {
        console.log(error)

    }
}
GetPokemons(URLpokemon)

const dataPokemons = async (data) => {
    list_pokemons$$.innerHTML = "";
    try {
        for (const index of data) {

            const resp = await fetch(index.url);
            const resul = await resp.json();
           // console.log(resul);
           console.log(resul);
           templateHTML=`
               <div class = "card">
               <div class="image-container">
               <img src="${resul.sprites.other.dream_world.front_default}" alt="${resul.name}" />
               </div>
               <div class="info">
               <span class="number">#${resul.id.toString().padStart(3, "0")}</span>
               <h3 class="name">${resul.name}</h3>
               <small class ="type">Type: ${resul.type}</small>
               </div>
               </div>
               ` 
           list_pokemons$$.innerHTML+=templateHTML;
   }
   
    } catch (error) {
    console.log(error);
}
}