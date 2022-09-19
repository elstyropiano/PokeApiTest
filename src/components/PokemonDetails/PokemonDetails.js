import { useContext, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import Context from '../../Context'
import Description from '../description/Description'
import { S } from './PokemonDetails.styled'
import { useTheme } from '@mui/material'
const PokemonDetails = () => {
  const location = useLocation()
  const { id } = useParams()
  const [fullArenaWarning, setFullArenaWarning] = useState(false)
  const [pokemonIsInFavourite, setPokemonIsInFavourite] = useState(null)
  const [pokemonIsInArena, setPokemonIsInArena] = useState(null)
  const [pokemonData, setPokemonData] = useState(null)
  const { palette } = useTheme()
  const [idFavouritesFromJsonServer, setIdFavouritesFromJsonServer] =
    useState(null)
  const [idArenaMemberFromJsonServer, setIdArenaMemberFromJsonServer] =
    useState(null)
  const {
    arenaMembers,
    setArenaMembers,
    favouritesPokemons,
    setFavouritesPokemons,
    themeColor,
  } = useContext(Context)

  const checkPokemonIsInArr = array => array.some(({ name }) => name === id)

  useEffect(() => {
    const {
      ability,
      experience,
      height,
      img,
      name,
      speed,
      weight,
      wins,
      loses,
    } = location.state.pokemonData
    const data = {
      ability,
      experience,
      height,
      img,
      name,
      speed,
      weight,
      wins,
      loses,
    }
    setPokemonData(data)
  }, [])

  useEffect(() => {
    if (favouritesPokemons) {
      const isThere = checkPokemonIsInArr(favouritesPokemons)
      setPokemonIsInFavourite(isThere)
      if (isThere)
        favouritesPokemons.map(({ name }, index) => {
          if (name === id) {
            const id = favouritesPokemons[index].id
            setIdFavouritesFromJsonServer(id)
          }
        })
    }
  }, [favouritesPokemons])

  useEffect(() => {
    if (arenaMembers) {
      const isThere = checkPokemonIsInArr(arenaMembers)
      setPokemonIsInArena(isThere)
      if (isThere)
        arenaMembers.map(({ name }, index) => {
          if (name === id) {
            const id = arenaMembers[index].id
            setIdArenaMemberFromJsonServer(id)
          }
        })
    }
  }, [arenaMembers])

  const handleIcon = endpoint => {
    if (endpoint === 'favouritesPokemons')
      pokemonIsInFavourite
        ? deleteFromServer(endpoint, idFavouritesFromJsonServer)
        : postDataOnServer(endpoint, pokemonData)
    else {
      if (pokemonIsInArena)
        deleteFromServer(endpoint, idArenaMemberFromJsonServer)
      else {
        arenaMembers.length === 2
          ? setFullArenaWarning(true)
          : postDataOnServer(endpoint, pokemonData)
      }
    }
  }

  const deleteFromServer = async (endpoint, id) => {
    try {
      await axios.delete(`http://localhost:3000/${endpoint}/${id}`)
      endpoint === 'arenaMembers' ? getArenaMembers() : getFavouritesPokemons()
    } catch (err) {
      console.log(err)
    }
  }
  const postDataOnServer = async (endpoint, data) => {
    try {
      await axios.post(`http://localhost:3000/${endpoint}`, data)
      endpoint === 'arenaMembers' ? getArenaMembers() : getFavouritesPokemons()
    } catch (err) {
      console.log(err)
    }
  }
  const getFavouritesPokemons = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/favouritesPokemons'
      )
      setFavouritesPokemons(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const getArenaMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/arenaMembers')
      setArenaMembers(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {pokemonData && (
        <S.Wrapper color={palette[themeColor].simplePokemonCard}>
          <S.ImgWrapper>
            <S.Img src={pokemonData.img} alt={pokemonData.name} />
          </S.ImgWrapper>
          <Description pokemonData={pokemonData} />

          <S.FavoriteIcon
            fav={pokemonIsInFavourite}
            onClick={() => handleIcon('favouritesPokemons')}
            sx={{ fontSize: '60px' }}
          />
          <S.StadiumIcon
            sx={{ fontSize: '60px' }}
            onClick={() => handleIcon('arenaMembers')}
            inarena={pokemonIsInArena}
          />
          <S.ArenaMember warning={arenaMembers?.length === 2}>
            {`${arenaMembers?.length}/2`}
          </S.ArenaMember>
          {fullArenaWarning && (
            <S.FullArenaInfo>Arena jest pełna</S.FullArenaInfo>
          )}
        </S.Wrapper>
      )}
    </>
  )
}

export default PokemonDetails
