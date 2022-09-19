import SimplePokemonCard from '../simplePokemonCard/SimplePokemonCard'
import { S } from './PokemonList.styled'
import { useTheme } from '@mui/material'
import Context from '../../Context'
import { useContext } from 'react'
import Zoom from 'react-reveal/Zoom'

const PokemonList = ({ array }) => {
  const { palette } = useTheme()
  const { themeColor } = useContext(Context)
  return (
    <S.Wrapper>
      {array?.map(pokemonData => (
        <S.Link
          color={palette[themeColor].navBar}
          state={{ pokemonData }}
          to={`/pokemon/${pokemonData.name}`}
          key={pokemonData.name}
        >
          <Zoom>
            <SimplePokemonCard list pokemonData={pokemonData} />
          </Zoom>
        </S.Link>
      ))}
    </S.Wrapper>
  )
}

export default PokemonList
