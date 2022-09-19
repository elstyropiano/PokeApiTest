import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const Context = createContext()

export function ContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null)
  const [arenaMembers, setArenaMembers] = useState(null)
  const [statsFromJsonServer, setStatsFromJsonServer] = useState(null)
  const [page, setPage] = useState(1)
  const [pokemonsArrayFromApi, setPokemonsArrayFromApi] = useState(null)
  const [filteredPokemons, setFilteredPokemons] = useState(null)
  const [filteredPokemonsCopy, setFilteredPokemonsCopy] = useState(null)
  const [favouritesPokemons, setFavouritesPokemons] = useState(null)
  const [usersList, setUsersList] = useState(null)
  const [newPokemonsList, setNewPokemonsList] = useState(null)
  const [themeColor, setThemeColor] = useState('dark')

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('logged'))
    setLoggedUser(loggedUser)
    ;(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/stats`)
        console.log(response)
        setStatsFromJsonServer(response.data)
        console.log(response.data, 'statsFromJsonServer')
      } catch (err) {
        console.log(err)
      }
    })()
    ;(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/arenaMembers`)
        setArenaMembers(response.data)
      } catch (err) {
        console.log(err)
      }
    })()
    ;(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/favouritesPokemons`
        )
        setFavouritesPokemons(response.data)
      } catch (err) {
        console.log(err)
      }
    })()
    ;(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users`)
        setUsersList(response.data)
      } catch (err) {
        console.log(err)
      }
    })()
    ;(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/newPokemons`)
        setNewPokemonsList(response.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  useEffect(() => {
    const offset = page === 1 ? 0 : (page - 1) * 15
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=15`
    if (page > 10) {
      const urlNewPokemons = `http://localhost:3000/newPokemons?_page=${
        page - 10
      }&_limit=15`
      ;(async () => {
        try {
          const response = await axios.get(urlNewPokemons)
          setPokemonsArrayFromApi(response.data)
        } catch (err) {
          console.log(err)
        }
      })()
    } else {
      ;(async () => {
        try {
          const response = await axios.get(url)
          setPokemonsArrayFromApi(response.data.results)
        } catch (err) {
          console.log(err)
        }
      })()
    }
  }, [page])
  console.log('wykonuje sie ')
  return (
    <Context.Provider
      value={{
        arenaMembers,
        favouritesPokemons,
        filteredPokemons,
        filteredPokemonsCopy,
        loggedUser,
        newPokemonsList,
        page,
        pokemonsArrayFromApi,
        statsFromJsonServer,
        themeColor,
        usersList,
        setArenaMembers,
        setFavouritesPokemons,
        setFilteredPokemons,
        setFilteredPokemonsCopy,
        setLoggedUser,
        setNewPokemonsList,
        setPage,
        setPokemonsArrayFromApi,
        setStatsFromJsonServer,
        setThemeColor,
        setUsersList,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export default Context
