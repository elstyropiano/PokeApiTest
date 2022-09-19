import axios from 'axios'
import { useContext, useEffect } from 'react'
import Context from '../../Context'
import PokemonList from '../../components/pokemonList/PokemonList'

const PokemonListHome = () => {
  const {
    filteredPokemons,
    setFilteredPokemonsCopy,
    page,
    statsFromJsonServer,
    setFilteredPokemons,
    pokemonsArrayFromApi,
    setStatsFromJsonServer,
  } = useContext(Context)

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/stats')
  //       setStatsFromJsonServer(response.data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   })()
  // }, [])
  useEffect(() => {
    if (page > 10) {
      return
    }
    setFilteredPokemons([])
    setFilteredPokemonsCopy([])
  }, [page])

  useEffect(() => {
    if (statsFromJsonServer) {
      if (page > 10) {
        setPokemonData()
        return
      }
      pokemonsArrayFromApi.map(({ url }) => fetchPokemon(url))
    }
  }, [pokemonsArrayFromApi])

  const setPokemonData = () => {
    const isThere = statsFromJsonServer.some(({ name }) =>
      filteredPokemons.map(data => data.name === name)
    )
    if (isThere) {
      statsFromJsonServer.map(pokemonData => {
        pokemonsArrayFromApi.map((data, index) => {
          if (data.name === pokemonData.name) {
            pokemonsArrayFromApi[index].experience = pokemonData.experience
            pokemonsArrayFromApi[index].height = pokemonData.height
            pokemonsArrayFromApi[index].weight = pokemonData.weight
            pokemonsArrayFromApi[index].wins = pokemonData.wins
            pokemonsArrayFromApi[index].loses = pokemonData.loses
          }
        })
      })
    }
    setFilteredPokemons(pokemonsArrayFromApi)
    setFilteredPokemonsCopy(pokemonsArrayFromApi)
  }

  const fetchPokemon = async url => {
    const response = await axios.get(url)
    const { name, height, weight, base_experience, sprites, abilities, stats } =
      response.data
    const img = sprites.other.dream_world.front_default
    const ability = abilities[0].ability.name
    const speed = stats[5].base_stat
    console.log(
      statsFromJsonServer,
      'statsFromJsonServer w set pokemon dawa w pokemon list home '
    )
    const isThere = statsFromJsonServer?.some(
      ({ name }) => name === response.data.name
    )
    if (isThere) {
      statsFromJsonServer?.filter(
        ({ name, height, weight, experience, loses, wins, speed }) => {
          if (name === response.data.name) {
            const data = {
              ability,
              experience,
              height,
              img,
              loses,
              name,
              speed,
              weight,
              wins,
            }
            setFilteredPokemons(prev => [...prev, data])
            setFilteredPokemonsCopy(prev => [...prev, data])
          }
        }
      )
    } else {
      const data = {
        ability,
        experience: base_experience,
        height,
        img,
        loses: 0,
        name,
        speed,
        weight,
        wins: 0,
      }
      setFilteredPokemons(prev => [...prev, data])
      setFilteredPokemonsCopy(prev => [...prev, data])
    }
  }

  return <>{statsFromJsonServer && <PokemonList array={filteredPokemons} />}</>
}

export default PokemonListHome
