import BackHomeButton from '../../components/backHomeButton/BackHomeButton'
import PokemonDetails from '../../components/pokemonDetails/PokemonDetails'
import { S } from './Details.styled'

const Details = () => (
  <S.Wrapper>
    <PokemonDetails />
    <BackHomeButton />
  </S.Wrapper>
)

export default Details
