import { useContext } from 'react'
import Context from '../../Context'
import { S } from './FavouritesPokemons.styled'
import emptyPokeball from '../../images/emptyPokeball.png'
import BackHomeButton from '../../components/backHomeButton/BackHomeButton'
import PokemonList from '../../components/pokemonList/PokemonList'

const FavouritesPokemons = () => {
  const { favouritesPokemons } = useContext(Context)
  return (
    <>
      <S.Wrapper empty={favouritesPokemons?.length === 0}>
        {favouritesPokemons?.length === 0 ? (
          <>
            <S.Img src={emptyPokeball} alt="empty_pokeball" />
            <h1>POKEBALL JEST PUSTY</h1>
          </>
        ) : (
          <PokemonList array={favouritesPokemons} />
        )}
      </S.Wrapper>
      <BackHomeButton />
    </>
  )
}

export default FavouritesPokemons
