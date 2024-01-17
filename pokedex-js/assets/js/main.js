
// function convertPokemonTypesToLi (PokemonTypes) {
//     return PokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
// }

// converter uma lista de um objeto para uma lista HTML
const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')

function convertPokemonToHtml (pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
                
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="details">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" 
            alt="imagem do ${pokemon.name}">
        </div>
    </li>
    `
}
// pokeApi.getPokemons().then((pokemonsList) => {
//         for (let i = 0; i < pokemonsList.length; i++) {
//             const pokemon = pokemonsList[i];
//             pokemonList.innerHTML += convertPokemonToHtml(pokemon)
//         }
//     })
//     .catch((error) => console.error(error))
// o 'map' faz um mapeamento assim como o 'for', o 'join' junta as strings separando-as pelo que tem no ()

const maxRecords = 151; // primeira temporada
const limit = 12;
let offset = 0;

function loadPokemonsItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonsList = []) => { 
        const newHtml = pokemonsList.map(convertPokemonToHtml).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecords = offset + limit;
    
    if (qtdRecords >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonsItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItens(offset, limit)
    }
})
