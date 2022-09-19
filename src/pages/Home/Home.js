import PokemonListHome from '../../components/pokemonListHome/PokemonListHome'
import Context from '../../Context'
import { useState, useContext, useEffect } from 'react'
import Pagination from '../../components/pagination/Pagination'
import { S } from './Home.styled'
import { useTheme } from '@mui/material'
import axios from 'axios'

const Home = () => {
  const [value, setValue] = useState('')
  const [warning, setWarning] = useState(false)
  const { palette } = useTheme()
  const {
    setFilteredPokemons,
    filteredPokemonsCopy,
    page,
    themeColor,
    // setStatsFromJsonServser,
  } = useContext(Context)

  useEffect(() => {
    setValue('')
    setWarning(false)
  }, [page])

  const handleInput = e => {
    const inputValue = e.target.value
    const newPokemonsArr = [...filteredPokemonsCopy]
    const newfilteredPokemons = newPokemonsArr?.filter(({ name }) =>
      name.includes(inputValue)
    )
    const noPokemonsWarning = newfilteredPokemons.length === 0 ? true : false
    setValue(inputValue)
    setWarning(noPokemonsWarning)
    setFilteredPokemons(newfilteredPokemons)
  }
  return (
    <S.Wrapper color={palette[themeColor].contrastText}>
      <S.TextField
        color={themeColor}
        onChange={handleInput}
        value={value}
        label="Wyszukaj pokemona "
        sx={{ margin: '30px 0' }}
      />
      <Pagination />
      {warning && (
        <S.NoResults color={palette[themeColor].navBar}>
          Brak wyników wyszukiwania
        </S.NoResults>
      )}
      <PokemonListHome />
    </S.Wrapper>
  )
}

export default Home
