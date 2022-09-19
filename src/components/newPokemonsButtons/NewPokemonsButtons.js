import { useState, useContext, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import Context from '../../Context'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { S } from './NewPokemonsButtons.styled'
const NewPokemonsButtons = ({
  createdPokemonData,
  setNewPokemonImg,
  newPokemonImg,
}) => {
  const { palette } = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const [isCreating, setIsCreating] = useState(false)
  const url = 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=10000'
  const { data } = useFetch(url)
  const navigate = useNavigate()
  const [number, setNumber] = useState(0)
  const { setStatsFromJsonServer, setNewPokemonsList, setPage, themeColor } =
    useContext(Context)
  const pokemonNameToUpperCase = pokemonName => {
    return `${pokemonName.substring(0, 1).toUpperCase()}${pokemonName.substring(
      1,
      pokemonName.length
    )}`
  }
  const snackBar = text => {
    navigate('/')
    enqueueSnackbar(text, {
      variant: 'success',
      anchorOrigin: {
        horizontal: 'center',
        vertical: 'top',
      },
    })
  }
  const createNewPokemon = () => {
    setIsCreating(true)
    const newData = {
      ...createdPokemonData,
      img: newPokemonImg,
      ability: 'god-mode',
    }
    postDataOnServer(newData)
    const nameUpper = pokemonNameToUpperCase(createdPokemonData.name)
    setTimeout(() => {
      snackBar(`Stworzono nowego Pokemona ${nameUpper}`)
    }, 1000)
  }

  const getStatsFromJsonServer = async () => {
    try {
      const response = await axios.get('http://localhost:3000/stats')
      setStatsFromJsonServer(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getNewPokemonList = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/newPokemons`)
      setNewPokemonsList(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleButton = e => {
    e.target.innerText === 'NEXT'
      ? setNumber(prev => prev + 1)
      : setNumber(prev => prev - 1)
  }

  const getPokemonImage = async url => {
    try {
      const response = await axios.get(url)
      setNewPokemonImg(response.data.sprites.other.dream_world.front_default)
    } catch (err) {
      console.log(err)
    }
  }

  const postDataOnServer = async data => {
    try {
      await axios.post(`http://localhost:3000/newPokemons`, { ...data })
      setPage(1)
      getStatsFromJsonServer()
      getNewPokemonList()
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (data) {
      getPokemonImage(data?.results[number].url)
    }
  }, [number, data])
  return (
    <>
      <S.Previous
        variant="contained"
        onClick={handleButton}
        disabled={number === 0}
        size="large"
        color={themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'}
      >
        Prev
      </S.Previous>
      <S.Next
        onClick={handleButton}
        disabled={number === data?.results.length}
        size="large"
        variant="contained"
        color={themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'}
      >
        Next
      </S.Next>
      <S.CreateButton
        onClick={createNewPokemon}
        disabled={isCreating}
        size="large"
        variant="contained"
        color={themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'}
      >
        Stwórz
      </S.CreateButton>
    </>
  )
}

export default NewPokemonsButtons
