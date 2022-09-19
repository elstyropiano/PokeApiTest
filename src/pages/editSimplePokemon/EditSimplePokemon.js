import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import { S } from './EditSimplePokemon.styled'
import Button from '@mui/material/Button'
import editPokemonSchemas from '../../schemas/editPokemonSchemas'
import { useState, useContext, useEffect } from 'react'
import Context from '../../Context'
import { useParams, useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import BackHomeButton from '../../components/backHomeButton/BackHomeButton'
import { useTheme } from '@mui/material'
import SimplePokemonCard from '../../components/simplePokemonCard/SimplePokemonCard'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
const EditSimplePokemon = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { palette } = useTheme()
  const { idPokemon } = useParams()
  const link = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
  const [pokemonExsist, setPokemonExsist] = useState(false)
  const [numButton, setNumButton] = useState(null)
  const { data, loading, error } = useFetch(link)
  const [pokemonWasUpdate, setPokemonWasUpdate] = useState(false)
  const [createdPokemonData, setCreatedPokemonData] = useState(false)
  const [pokemonWasCreate, setPokemonWasCreate] = useState(false)
  const [allExsistingPokemonsNames, setAllExsistingPokemonsNames] =
    useState(null)
  const {
    statsFromJsonServer,
    setStatsFromJsonServer,
    newPokemonsList,

    themeColor,
  } = useContext(Context)
  const [nameDifferenceChangePokemon, setNameDifferenceChangePokemon] =
    useState(false)
  const location = useLocation()

  useEffect(() => {
    const link = `https://pokeapi.co/api/v2/pokemon?limit=1154&offset=0"`
    if (newPokemonsList) {
      ;(async () => {
        const response = await axios.get(link)
        const { results } = response.data
        const pokemonsNamesArr = results.map(({ name }) => name)
        const newPokemonsNames = newPokemonsList?.map(({ name }) => name)
        const pokemonsFromApiAndCreated = [
          ...pokemonsNamesArr,
          ...newPokemonsNames,
        ]
        setAllExsistingPokemonsNames(pokemonsFromApiAndCreated)
      })()
    }
  }, [newPokemonsList])
  const snackBar = text => {
    navigate('/')
    enqueueSnackbar(text, {
      variant: 'success',
      anchorOrigin: {
        horizontal: 'center',
        vertical: 'top',
      },
    })
  }
  const pokemonNameToUpperCase = pokemonName => {
    return `${pokemonName.substring(0, 1).toUpperCase()}${pokemonName.substring(
      1,
      pokemonName.length
    )}`
  }
  const putDataOnServer = async (data, id) =>
    await axios
      .put(`http://localhost:3000/stats/${id}`, { ...data })
      .then(response => {
        getStatsFromJsonServer()
      })
      .catch(error => console.log(error))

  const postDataOnServer = async (data, endpoint) =>
    await axios
      .post(`http://localhost:3000/${endpoint}`, { ...data })
      .then(response => {
        getStatsFromJsonServer()
      })
      .catch(error => console.log(error))
  const getStatsFromJsonServer = async () =>
    await axios
      .get('http://localhost:3000/stats')
      .then(response => setStatsFromJsonServer(response.data))
      .catch(error => console.log(error))

  const onSubmit = async (values, actions) => {
    const isThere = statsFromJsonServer?.some(({ name }) => name === data?.name)

    if (numButton === '0') {
      if (data?.name !== values.name) {
        setNameDifferenceChangePokemon(true)
        return
      }
      if (isThere) {
        statsFromJsonServer?.map(({ name, wins, loses, id }) => {
          if (name === data?.name) {
            const dataToSend = {
              name,
              experience: values.experience,
              height: values.height,
              weight: values.weight,
              wins,
              loses,
            }

            putDataOnServer(dataToSend, id)
          }
        })
      } else {
        const dataToSend = {
          name: data?.name,
          experience: values.experience,
          height: values.height,
          weight: values.weight,
          wins: 0,
          loses: 0,
        }

        postDataOnServer(dataToSend, 'stats')
      }

      await new Promise(resolve => {
        setTimeout(resolve, 1000)
      })

      const nameUpper = pokemonNameToUpperCase(values.name)
      snackBar(`Zmieniono atrybuty pokemona :  ${nameUpper}`)
    } else if (numButton === '1') {
      if (allExsistingPokemonsNames.indexOf(values.name) !== -1) {
        setPokemonExsist(true)
        return
      }

      const dataToSend = {
        name: values.name,
        experience: values.experience,
        height: values.height,
        weight: values.weight,
        wins: 0,
        loses: 0,
        ability: location.state.ability,
        speed: location.state.speed,
      }

      setCreatedPokemonData(dataToSend)
      setPokemonWasCreate(true)
    }
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    isSubmitting,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: location.state.name,
      height: location.state.height,
      experience: location.state.experience,
      weight: location.state.weight,
    },
    validationSchema: editPokemonSchemas,
    onSubmit,
  })

  const TextFieldStyle = { marginTop: '30px ', width: '100%' }

  return (
    <S.Wrapper>
      {pokemonWasCreate && (
        <S.H1
          color={themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'}
          style={{ position: 'absolute', top: '-75px' }}
        >
          Dobierz ikone Pokemona
        </S.H1>
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <S.FormWrapper
          pokemonWasCreate={pokemonWasCreate}
          color={palette[themeColor].simplePokemonCard}
        >
          {pokemonWasCreate && (
            <>
              <SimplePokemonCard
                newPokemon
                pokemonData={createdPokemonData}
                createdPokemonData={createdPokemonData}
              />
            </>
          )}

          {!pokemonWasUpdate && !pokemonWasCreate && (
            <>
              <S.H1
                color={
                  themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'
                }
              >
                {idPokemon.toUpperCase()}
              </S.H1>
              <img
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  width: '100px',
                  height: '100px',
                }}
                src={data?.sprites.other.dream_world.front_default}
                alt={data?.name}
              />

              <TextField
                color={themeColor}
                id="name"
                label="Nazwa pokemona"
                sx={TextFieldStyle}
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name ? 'input-error' : ''}
                error={errors.name && touched.name ? true : false}
              />
              {touched.name && errors.name !== '' && (
                <S.ValidationErrorMessage>
                  {errors.name}
                </S.ValidationErrorMessage>
              )}
              {nameDifferenceChangePokemon && (
                <S.ValidationErrorMessage>
                  Przy zmianie atrybutow imie pokemona nie moze byc zmienione
                </S.ValidationErrorMessage>
              )}

              <TextField
                color={themeColor}
                id="height"
                label="Wzrost"
                type="number"
                sx={TextFieldStyle}
                value={values.height}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.height && touched.height ? true : false}
              />
              {touched.height && errors.height !== '' && (
                <S.ValidationErrorMessage>
                  {errors.height}
                </S.ValidationErrorMessage>
              )}
              <TextField
                color={themeColor}
                id="experience"
                label="Doświadczenie"
                sx={TextFieldStyle}
                type="number"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.experience && touched.experience ? true : false}
              />
              {touched.experience && errors.experience !== '' && (
                <S.ValidationErrorMessage>
                  {errors.experience}
                </S.ValidationErrorMessage>
              )}
              <TextField
                color={themeColor}
                id="weight"
                label="Waga"
                sx={TextFieldStyle}
                type="number"
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.weight && touched.weight ? true : false}
              />
              {touched.weight && errors.weight !== '' && (
                <S.ValidationErrorMessage>
                  {errors.weight}
                </S.ValidationErrorMessage>
              )}

              {pokemonExsist && (
                <p style={{ color: '#d32f2f' }}>
                  Pokemon o danej nazwie już istnieje
                </p>
              )}
              <Button
                sx={{ marginTop: '30px ', height: '55px', width: '100%' }}
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                onClick={e => setNumButton(e.target.value)}
                value={0}
                color={
                  themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'
                }
              >
                Zmień atrybuty
              </Button>
              <Button
                sx={{ marginTop: '30px ', height: '55px', width: '100%' }}
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                onClick={e => setNumButton(e.target.value)}
                value={1}
                color={
                  themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'
                }
              >
                Stwórz nowego Pokemona
              </Button>
            </>
          )}
        </S.FormWrapper>
      </form>
      <BackHomeButton />
    </S.Wrapper>
  )
}

export default EditSimplePokemon
