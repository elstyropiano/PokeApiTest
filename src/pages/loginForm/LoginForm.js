import { useFormik } from 'formik'
import { S } from './LoginForm.styled'
import loginSchemas from '../../schemas/loginSchemas'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../../Context'
import BackHomeButton from '../../components/backHomeButton/BackHomeButton'
import { useTheme, TextField, Button } from '@mui/material'
import { useSnackbar } from 'notistack'
const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { palette } = useTheme()
  const [loginError, setLoginError] = useState(false)
  const { setLoggedUser, usersList, themeColor } = useContext(Context)
  const navigate = useNavigate()

  const onSubmit = async (values, actions) => {
    const isOk = usersList.some(
      ({ email, password }) =>
        email === values.email && password === values.password
    )

    if (isOk) {
      usersList.map(({ name, email, password }) => {
        if (email === values.email && password === values.password) {
          const data = {
            name,
            email,
            password,
          }
          window.localStorage.setItem('logged', JSON.stringify(data))
          setLoggedUser(data)
        }
      })
      await new Promise(resolve => {
        setTimeout(resolve, 1000)
      })
      navigate('/edycja')
      enqueueSnackbar('Zalogowano', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
      })
    } else setLoginError(true)
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
    initialValues: { email: '', password: '' },
    validationSchema: loginSchemas,
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
            Logowanie
          </S.H1>
          <TextField
            id="email"
            label="Email"
            sx={TextFieldStyle}
            type="text"
            color={themeColor}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'input-error' : ''}
            error={errors.email && touched.email ? true : false}
          />
          {touched.email && errors.email !== '' && (
            <S.ValidationErrorMessage color={palette[themeColor].error}>
              {errors.email}
            </S.ValidationErrorMessage>
          )}
          <TextField
            id="password"
            label="Hasło"
            sx={TextFieldStyle}
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password ? true : false}
            color={themeColor}
          />
          {touched.password && errors.password !== '' && (
            <S.ValidationErrorMessage color={palette[themeColor].error}>
              {errors.password}
            </S.ValidationErrorMessage>
          )}
          {loginError && (
            <S.Error color={palette[themeColor].error}>
              Wprowadź poprawne dane użytkownika
            </S.Error>
          )}
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color={
              themeColor === 'dark' ? 'loginButtonDark' : 'loginButtonColor'
            }
            sx={{ marginTop: '30px ', height: '55px', width: '100%' }}
          >
            Zaloguj się
          </Button>
        </S.FormWrapper>
      </form>
      <BackHomeButton />
    </S.MainWrapper>
  )
}

export default LoginForm
