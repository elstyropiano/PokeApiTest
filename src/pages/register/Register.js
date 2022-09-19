import { Button, TextField, useTheme } from '@mui/material'
import { useState, useContext } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import validationSchemas from '../../schemas/validationSchemas'
import Context from '../../Context'
import { S } from './Register.styled'
import BackHomeButton from '../../components/backHomeButton/BackHomeButton'

const Register = () => {
  const [exsist, setExsist] = useState(false)
  const { palette } = useTheme()
  const navigate = useNavigate()
  const { setLoggedUser, usersList, setUsersList, themeColor } =
    useContext(Context)

  const onSubmit = async (values, actions) => {
    const isThere = usersList.some(({ name, email }) =>
      name === values.name || email === values.email ? true : false
    )
    if (isThere) {
      usersList.map(({ name, email }) => {
        console.log(name, email, 'items w maie')
        if (name === values.name || email === values.email) setExsist(true)
      })
    } else {
      await new Promise(resolve => {
        setTimeout(resolve, 1000)
      })
      const newUsersList = [...usersList, values]

      const dataToLocalStorage = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      window.localStorage.setItem('logged', JSON.stringify(dataToLocalStorage))
      actions.resetForm()
      setExsist(false)
      setLoggedUser(dataToLocalStorage)
      setUsersList(newUsersList)
      navigate('/')

      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      postDataOnServer(data)
    }
  }

  const postDataOnServer = async data =>
    await axios
      .post(`http://localhost:3000/users`, { ...data })
      .then(response => console.log(response))
      .catch(error => console.log(error))

  const {
    values,
    errors,
    touched,
    handleChange,
    isSubmitting,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: validationSchemas,
    onSubmit,
  })

  const TextFieldStyle = { marginTop: '30px ', width: '100%' }

  return (
    <S.MainWrapper>
      <form onSubmit={handleSubmit} autoComplete="off">
        <S.FormWrapper color={palette[themeColor].simplePokemonCard}>
          <S.H1
            color={
              palette[themeColor] === 'dark'
                ? palette.loginButtonDark.main
                : palette.loginButtonColor.main
            }
          >
            Rejestracja
          </S.H1>
          <TextField
            color={themeColor}
            id="name"
            label="Imię"
            sx={TextFieldStyle}
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'input-error' : ''}
            error={errors.name && touched.name ? true : false}
          />
          {touched.name && errors.name !== '' && (
            <S.ValidationErrorMessage color={palette[themeColor].error}>
              {errors.name}
            </S.ValidationErrorMessage>
          )}
          <TextField
            color={themeColor}
            id="email"
            label="Email"
            sx={TextFieldStyle}
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email ? true : false}
          />
          {touched.email && errors.email !== '' && (
            <S.ValidationErrorMessage color={palette[themeColor].error}>
              {errors.email}
            </S.ValidationErrorMessage>
          )}
          <TextField
            color={themeColor}
            id="password"
            label="Hasło"
            sx={TextFieldStyle}
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password ? true : false}
          />
          {touched.password && errors.password !== '' && (
            <S.ValidationErrorMessage color={palette[themeColor].error}>
              {errors.password}
            </S.ValidationErrorMessage>
          )}
          <TextField
            color={themeColor}
            id="confirmPassword"
            label="Potwierdź hasło"
            sx={TextFieldStyle}
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.confirmPassword && touched.confirmPassword ? true : false
            }
          />
          {touched.confirmPassword && errors.confirmPassword !== '' && (
            <S.ValidationErrorMessage color={palette[themeColor].error}>
              {errors.confirmPassword}
            </S.ValidationErrorMessage>
          )}
          {exsist && (
            <S.Error color={palette[themeColor].error}>
              Imię lub email istnieje
            </S.Error>
          )}
          <Button
            color={
              themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'
            }
            sx={{ marginTop: '30px ', height: '55px', width: '100%' }}
            disabled={isSubmitting}
            type="submit"
            variant="contained"
          >
            Zarejestruj się
          </Button>
        </S.FormWrapper>
      </form>
      <BackHomeButton />
    </S.MainWrapper>
  )
}

export default Register
