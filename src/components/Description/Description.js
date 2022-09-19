import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import { S } from './Description.styled'
import { useTheme } from '@mui/material'
const Description = ({ details, pokemonData }) => {
  const { statsFromJsonServer, themeColor, setStatsFromJsonServer } =
    useContext(Context)
  const [experience, setExperience] = useState(null)
  const [name, setName] = useState(null)
  const { palette } = useTheme()
  const checkPokemonIsInArr = array =>
    array?.some(({ name }) => name === pokemonData?.name)

  useEffect(() => {
    if (pokemonData) {
      const newName = `${pokemonData?.name
        ?.substring(0, 1)
        .toUpperCase()}${pokemonData?.name.substring(
        1,
        pokemonData?.name.length
      )}`
      setName(newName)
    }
  }, [pokemonData])

  useEffect(() => {
    const isThere = checkPokemonIsInArr(statsFromJsonServer)

    if (isThere) {
      statsFromJsonServer.map(({ name, experience, weight, height }) => {
        if (name === pokemonData.name) {
          setExperience(experience)
        }
      })
    } else {
      setExperience(pokemonData?.experience)
    }
  }, [name])

  return (
    <S.DescripionWrapper color={palette[themeColor].textColorSimplePokemonCard}>
      <S.H1 details={details} color={palette[themeColor].navBar}>
        {name}
      </S.H1>
      <S.StatisticWrapper>
        <S.DoubleDecripionWrapper>
          <S.Span color={palette[themeColor].statsColor}>
            {pokemonData?.height}
            <S.SpanPropsName color={palette[themeColor].statsColorBig}>
              Height
            </S.SpanPropsName>
          </S.Span>
          <S.Span color={palette[themeColor].statsColor}>
            {pokemonData?.weight}
            <S.SpanPropsName color={palette[themeColor].statsColorBig}>
              Weight
            </S.SpanPropsName>
          </S.Span>
        </S.DoubleDecripionWrapper>
        <S.DoubleDecripionWrapper>
          <S.Span color={palette[themeColor].statsColor}>
            {experience}
            <S.SpanPropsName color={palette[themeColor].statsColorBig}>
              Base experience
            </S.SpanPropsName>
          </S.Span>

          <S.Span color={palette[themeColor].statsColor}>
            {pokemonData?.ability}
            <S.SpanPropsName color={palette[themeColor].statsColorBig}>
              Ability
            </S.SpanPropsName>
          </S.Span>
        </S.DoubleDecripionWrapper>
      </S.StatisticWrapper>
    </S.DescripionWrapper>
  )
}

export default Description
