const input = document.querySelector('#input')
const container = document.querySelector('.container')
const form = document.querySelector('form')
const button = document.querySelector('button')

button.addEventListener('click', (event) => {
    container.textContent = ''
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1118&offset=0`)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                console.log('Erro')
                return
            }
            return response.json()
        })
        .then(formatado => {
            console.log(formatado)

            if (!isNaN(input.value)) requisicao(input.value)

            else {

                formatado.results.forEach(item => {
                    const pokemonAtual = item.name

                    if (pokemonAtual.toUpperCase().includes(input.value.toUpperCase())) {
                        requisicao(pokemonAtual)
                    }

                })
            }
        })
})

function requisicao(endpoint) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)

        .then(response2 => {
            console.log(response2)
            if (!response2.ok) {
                console.log('Erro')
                return
            }
            return response2.json()
        })
        .then(formatado2 => {
            console.log(formatado2)

            const divPokemon = document.createElement('div')
            divPokemon.classList.add('pokemon')

            const nomePokemon = document.createElement('h2')
            nomePokemon.classList.add('pokemon__nome')

            const divDescricao = document.createElement('div')
            divDescricao.classList.add('pokemon__descricao')

            const imgPokemon = document.createElement('img')
            imgPokemon.classList.add('pokemon__img')

            const divHabilidades = document.createElement('div')
            divHabilidades.classList.add('pokemon__habilidades')

            const tituloHabilidades = document.createElement('h1')
            tituloHabilidades.classList.add('pokemon__habilidades-h1')


            nomePokemon.textContent = formatado2.species.name[0].toUpperCase() + formatado2.species.name.slice(1)
            imgPokemon.src = formatado2.sprites.front_default
            tituloHabilidades.textContent = 'Habilidades'
            divHabilidades.append(tituloHabilidades)
            formatado2.abilities.forEach((item) => {
                const habilidadePokemon = document.createElement('span')
                habilidadePokemon.classList.add('pokemon__habilidade')
                habilidadePokemon.textContent = item.ability.name
                divHabilidades.append(habilidadePokemon)
            })

            container.append(divPokemon)
            divPokemon.append(nomePokemon, divDescricao)
            divDescricao.append(imgPokemon, divHabilidades)


        })
}