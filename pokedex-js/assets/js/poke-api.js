/* 
 - consumo de uma API através do 'fetch' que "promete uma resposta (estrutura de uma promessa)", neste caso 
   o fetch está trazendo uma lista, varrendo ela, trazendo através do response e tasnformando em um json,
   depois de ter a lista, é feito um 'mapeamento' dela com o 'map' em uma lista de requisições com os detalhes 
   dos pokemons com um novo 'fetch' e convertendo a 'response' em um json, e após as requisições terminarem, ele 
   retorna uma lista dos detalhes dos pokemons no 'Promise.all(detailsRequests)';

 - com o 'then' retorna o status da resposta em caso de sucesso;
 - para o "fracasso", temos o 'getch', e o 'finally' retorna algo independente do sucesso ou fracasso;
 - o arrow function "=>" é uma função "sem contexto" utilizadas para callback e contextos não isolados;
 - com o arrow function é possível reduzir bem o tamanho do corpo da função ex.:
    .finally(function() { 
        console.log('Requisição concluida!');
    })
 - para (parâmetro) => 'ação da função'
 - obs.: chamar esse script antes do 'main.js', ja que a função 'pokeApi' é chamada daqui pra lá.
*/
const pokeApi = {};

function convertPokeApiDetailToPokemon (pokemonsDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokemonsDetail.id
    pokemon.name = pokemonsDetail.name

    const types = pokemonsDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemonsDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json()) 
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


