import useFetch from '../../hooks/useFetch'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { S } from './EditPokemonListElement.styled'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Context from '../../Context'
import { useTheme } from '@mui/material'
const EditPokemonListElement = ({ url, index }) => {
  const { data, loading, error } = useFetch(url)
  const { statsFromJsonServer, themeColor } = useContext(Context)
  const { palette } = useTheme()
  const [exp, setExp] = useState(null)
  const [weight, setWeight] = useState(null)
  const [height, setHeight] = useState(null)
  useEffect(() => {
    const isThere = statsFromJsonServer?.some(({ name }) => name === data?.name)

    if (isThere) {
      statsFromJsonServer?.map(({ name, experience, weight, height }) => {
        if (name === data?.name) {
          console.log(weight)
          setExp(experience)
          setWeight(weight)
          setHeight(height)
        }
      })
    } else {
      setExp(data?.base_experience)
      setWeight(data?.weight)
      setHeight(data?.height)
    }
  }, [data])

  return (
    <S.Wrapper color={palette[themeColor].simplePokemonCard}>
      {loading && (
        <>
          <CircularProgress />
          <p>...LOADING</p>
        </>
      )}
      {data && (
        <>
          <h1>{index}</h1>
          <h3> {data.name.toUpperCase()}</h3>
          <div style={{ width: '70px', height: '70px' }}>
            <img
              style={{ widht: '100%', height: '100%' }}
              src={data?.sprites.other.dream_world.front_default}
              alt={data.name}
            />
          </div>
          <S.Link
            to={`/edycja/${data.name}`}
            state={{
              name: data?.name,
              height: height,
              experience: exp,
              weight: weight,
              img: data?.sprites.other.dream_world.front_default,
              speed: data?.stats[5].base_stat,
              ability: data?.abilities[0].ability.name,
            }}
          >
            <Button
              variant="contained"
              color={
                themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'
              }
            >
              Edytuj
            </Button>
          </S.Link>
        </>
      )}
      {error && <p>error:{error}</p>}
    </S.Wrapper>
  )
}

export default EditPokemonListElement
