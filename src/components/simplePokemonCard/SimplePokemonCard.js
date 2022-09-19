import Description from '../description/Description'
import { S } from './SimplePokemonCard.styled'
import FightStats from '../fightStats/FightStats'
import DeleteFromArenaIcon from '../deleteFromArenaIcon/DeleteFromArenaIcon'
import { useState } from 'react'
import NewPokemonsButtons from '../newPokemonsButtons/NewPokemonsButtons'
import { useTheme } from '@mui/material'
import Context from '../../Context'
import { useContext } from 'react'

const SimplePokemonCard = ({
  newPokemon,
  arena,
  list,
  pokemonData,
  createdPokemonData,
  setCreateIsDone,
}) => {
  const { palette } = useTheme()
  const { themeColor } = useContext(Context)
  const [newPokemonImg, setNewPokemonImg] = useState(null)

  return (
    <>
      {newPokemon && (
        <>
          <NewPokemonsButtons
            createdPokemonData={createdPokemonData}
            setCreateIsDone={setCreateIsDone}
            setNewPokemonImg={setNewPokemonImg}
            newPokemonImg={newPokemonImg}
          />
        </>
      )}
      <S.MainWrapper
        list={list}
        arena={arena}
        color={palette[themeColor].simplePokemonCard}
      >
        {pokemonData && (
          <>
            {'wins' in pokemonData &&
              (pokemonData.wins !== 0 || pokemonData.loses !== 0) && (
                <FightStats wins={pokemonData.wins} loses={pokemonData.loses} />
              )}
            {arena && <DeleteFromArenaIcon pokemonData={pokemonData} />}
            <S.PokemonWrapper>
              <S.ImgWrapper>
                <S.Img
                  src={newPokemon ? newPokemonImg : pokemonData.img}
                  alt={pokemonData.name}
                />
              </S.ImgWrapper>
              <Description pokemonData={pokemonData} />
            </S.PokemonWrapper>
          </>
        )}
      </S.MainWrapper>
    </>
  )
}

export default SimplePokemonCard
