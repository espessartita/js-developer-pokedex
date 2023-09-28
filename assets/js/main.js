const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")
const maxRecords = 151
const limit = 10
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon_individual) => `
      <li class="pokemon_individual ${pokemon_individual.type}">
        <span class="number">#${pokemon_individual.number}</span>
        <span class="name">${pokemon_individual.name}</span>
        <div class="detail">
          <ol class="type">
            ${pokemon_individual.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon_individual.photo}"
            alt="${pokemon_individual.name}"/>
        </div>
      </li>
    `).join('')
    pokemonList.innerHTML += newHtml
  })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  debugger
  const qtdRecordNextPage = offset + limit
  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItems(offset, limit)
  }  
})
