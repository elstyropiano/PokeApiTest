import useFetch from '../../hooks/useFetch'
import EditPokemonListElement from '../../components/editPokemonListElement/EditPokemonListElement'
import { S } from './Edit.styled'
import BackHomeButton from '../../components/backHomeButton/BackHomeButton'
import { useTheme } from '@mui/material'
import { useContext } from 'react'
import Context from '../../Context'
const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`

const Edit = () => {
  const { data } = useFetch(url)
  const { palette } = useTheme()
  const { themeColor } = useContext(Context)
  return (
    <S.Wrapper>
      <BackHomeButton />
      <S.Description color={palette[themeColor].navBar}>
        Witaj w oknie edycji pokemonow. Wybierz pokemona z listy , a nastepnie
        modyfikuj jego atrybuty lub stwórz całkowicie nowego pokemona !! Dobrej
        zabawy
      </S.Description>
      <S.PokemonList>
        {data &&
          data.results.map(({ url }, index) => {
            return (
              <EditPokemonListElement key={url} url={url} index={index + 1} />
            )
          })}
      </S.PokemonList>

      <BackHomeButton />
    </S.Wrapper>
  )
}
export default Edit
