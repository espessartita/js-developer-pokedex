const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon_individual = new Pokemon()
    pokemon_individual.number = pokeDetail.id
    pokemon_individual.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon_individual.types = types
    pokemon_individual.type = type

    pokemon_individual.photo = pokeDetail.sprites.other["official-artwork"].front_default

    return pokemon_individual
}

pokeApi.getPokemonDetail = (pokemon_individual) => {
    return fetch(pokemon_individual.url).then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}