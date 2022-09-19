import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ContextProvider } from './Context'
import { SnackbarProvider } from 'notistack'
const root = ReactDOM.createRoot(document.getElementById('root'))

const theme = createTheme({
  palette: {
    dark: {
      main: '#55ACEE',
      navBar: '#292f33',
      simplePokemonCard: '#ccd6dd',
      contrastText: '#fff',
      statsColor: '#66757F',
      statsColorBig: '#292f33',
      dark: '#1689e0',
      error: '#E50914',
    },

    light: {
      main: '#34A853',
      navBar: '#4285F4',
      simplePokemonCard: '#FFBB00',
      contrastText: '#000',
      statsColor: '#000',
      statsColorBig: '#000',
      dark: '#4cc76d',
      error: '#E50914',
    },

    error: {
      main: '#E50914',
    },

    loginButtonDark: {
      main: '#292f33',
      dark: '#343c41',
      contrastText: '#fff',
    },
    loginButtonColor: {
      main: '#000',
      dark: '#343c41',
      contrastText: '#fff',
    },

    typography: {
      color: 'red',
    },
  },
})
root.render(
  <ContextProvider>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1} autoHideDuration={2500}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </ContextProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
