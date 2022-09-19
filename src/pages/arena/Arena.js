import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import SimplePokemonCard from '../../components/simplePokemonCard/SimplePokemonCard'
import pokeball from '../../images/pokeball.png'
import BackHomeButton from '../../components/backHomeButton/BackHomeButton'
import { S } from './Arena.styled'
import axios from 'axios'
import { useTheme } from '@mui/material'
import FightButton from '../../components/fightButton/FightButton'
import { Navigate, useNavigate } from 'react-router-dom'

const Arena = () => {
  const { palette } = useTheme()
  const { themeColor } = useContext(Context)
  const [draw, setDraw] = useState(false)
  const [numDelete, setNumDelete] = useState(0)
  const [arenaFinish, setArenaFinish] = useState(false)
  const navigate = useNavigate()
  const {
    statsFromJsonServer,
    arenaMembers,
    setStatsFromJsonServer,
    setArenaMembers,
  } = useContext(Context)

  const alertMessage = winner => {
    const alertMessage = `Zwyciężył ${winner.toUpperCase()}. Otrzymuje on +10 Exp.`
    alert(alertMessage)
  }
  const checkPokemonIsInArr = winner =>
    statsFromJsonServer?.some(({ name }) => name === winner.name)

  const countPokemonPower = pokemon => {
    const { experience, height, weight, speed } = pokemon
    const pokemonPower = experience * weight * height * speed
    return pokemonPower
  }

  const checkPokemonIsInJsonServer = (
    data,
    status,
    experienceToAdd,
    idToDelete
  ) => {
    const isThere = checkPokemonIsInArr(data)

    if (isThere)
      statsFromJsonServer?.map(
        ({ name, experience, height, weight, wins, loses, speed, id }) => {
          if (name === data.name) {
            if (status === 'winner') {
              const newWinnerData = {
                name,
                experience: experience + experienceToAdd,
                height,
                weight,
                wins: wins + 1,
                loses,
                speed,
              }
              if (draw) {
                return
              }
              putDataOnServer(newWinnerData, id)
              // deleteFromServer(idToDelete)
            } else {
              const newLoserData = {
                name,
                experience,
                height,
                weight,
                wins,
                loses: loses + 1,
                speed: data.speed,
              }
              putDataOnServer(newLoserData, id)
            }
          }
        }
      )
    else {
      if (status === 'winner') {
        const newWinnerData = {
          name: data?.name,
          experience: data?.experience + experienceToAdd,
          height: data?.height,
          weight: data?.weight,
          wins: 1,
          loses: 0,
          ability: data?.ability,
          speed: data.speed,
        }
        if (draw) {
          return
        }
        postDataOnServer(newWinnerData)
      } else {
        const newLoserData = {
          name: data?.name,
          experience: data?.experience,
          height: data?.height,
          weight: data?.weight,
          wins: 0,
          loses: 1,
          speed: data.speed,
          ability: data.ability,
        }
        postDataOnServer(newLoserData)
      }
    }
  }

  const handleButton = async () => {
    const pokemonPowerArr = arenaMembers.map(pokemon =>
      countPokemonPower(pokemon)
    )
    const pokemonOne = pokemonPowerArr[0]
    const pokemonTwo = pokemonPowerArr[1]

    if (pokemonOne === pokemonTwo) {
      setDraw(true)
      arenaMembers.map((arenaMember, index) => {
        checkPokemonIsInJsonServer(arenaMembers[index], 'winner', 5, true)
      })
    } else if (pokemonOne > pokemonTwo) {
      const winnerName = arenaMembers[0].name
      const winner = arenaMembers[0]
      const loser = arenaMembers[1]
      actionsAfterButtonClick(winnerName, winner, loser)
    } else {
      const winnerName = arenaMembers[1].name
      const winner = arenaMembers[1]
      const loser = arenaMembers[0]
      actionsAfterButtonClick(winnerName, winner, loser)
    }
  }
  const actionsAfterButtonClick = (winnerName, winner, loser) => {
    alertMessage(winnerName)
    checkPokemonIsInJsonServer(winner, 'winner', 10)
    checkPokemonIsInJsonServer(loser, 'loser', 0)
    deleteFromArena(arenaMembers[0].id)
    deleteFromArena(arenaMembers[1].id)
    setArenaMembers([])
    setArenaFinish(true)
    // getStatsFromJsonServer()
  }

  const deleteFromArena = idToDelete => {
    try {
      axios.delete(`http://localhost:3000/arenaMembers/${idToDelete}`)
    } catch (err) {
      console.log(err)
    }
  }
  const putDataOnServer = (data, id) => {
    try {
      axios.put(`http://localhost:3000/stats/${id}`, { ...data })
    } catch (err) {
      console.log(err)
    }
  }
  const postDataOnServer = data => {
    try {
      axios.post('http://localhost:3000/stats', { ...data })
    } catch (err) {
      console.log(err)
    }
  }
  const getStatsFromJsonServer = async () => {
    try {
      const response = await axios.get('http://localhost:3000/stats')
      console.log(response.data, 'statsy z json ')
      setStatsFromJsonServer(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleFinishArenaButton = () => {
    getStatsFromJsonServer()
    navigate('/')
  }
  return (
    <S.Wrapper octagon="../images/octagon.jpg">
      {arenaFinish && (
        <button
          style={{ width: '500px', background: 'white' }}
          onClick={handleFinishArenaButton}
        >
          asdasdasdsad
        </button>
      )}
      {/* {num === 2 && (
        <div style={{ backgroundColor: 'red' }}>
          <h1></h1>
          <button
            onClick={() => {
              // setNum(0)
              const indexOne = arenaMembers[0].id
              const indexTwo = arenaMembers[1].id
              deleteFromServer(indexOne)
              deleteFromServer(indexTwo)
              setArenaMembers([])
            }}
          >
            asdasdasd
          </button>
        </div>
      )} */}
      <S.PlaceholderWrapper>
        <S.Placeholder
          // loser={arenaMembers[0]<}
          color={palette[themeColor].simplePokemonCard}
        >
          {arenaMembers[0] ? (
            <SimplePokemonCard arena pokemonData={arenaMembers[0]} />
          ) : (
            <img src={pokeball} alt="pokeball" />
          )}
        </S.Placeholder>
        <FightButton arenaMembers={arenaMembers} handleButton={handleButton} />
        <S.Placeholder color={palette[themeColor].simplePokemonCard}>
          {arenaMembers[1] ? (
            <SimplePokemonCard arena pokemonData={arenaMembers[1]} />
          ) : (
            <img src={pokeball} alt="pokeball" />
          )}
        </S.Placeholder>
      </S.PlaceholderWrapper>
      <S.BackHomeWrapper>
        <BackHomeButton />
      </S.BackHomeWrapper>
    </S.Wrapper>
  )
}

export default Arena
