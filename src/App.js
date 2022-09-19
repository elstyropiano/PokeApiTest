import { Routes, Route, BrowserRouter } from 'react-router-dom'
import NavBar from './components/navBar/NavBar'
import Home from './pages/home/Home'
import FavouritesPokemons from './pages/favouritesPokemons/FavouritesPokemons'
import Details from './pages/details/Details'
import styled from 'styled-components'
import Arena from './pages/arena/Arena'
import Register from './pages/register/Register'
import LoginForm from './pages/loginForm/LoginForm'
import Edit from './pages/edit/Edit'
import { useContext } from 'react'
import Context from './Context'
import EditSimplePokemon from './pages/editSimplePokemon/EditSimplePokemon'
import SwitchTheme from './components/switchTheme/SwitchTheme'
const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  `,
}

const App = () => {
  const { loggedUser } = useContext(Context)

  return (
    <BrowserRouter>
      <S.Wrapper>
        <SwitchTheme />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ulubione" element={<FavouritesPokemons />} />
          <Route path="arena" element={<Arena />} />
          <Route path="pokemon/:id" element={<Details />} />
          <Route path="rejestracja" element={<Register />} />
          <Route path="/logowanie" element={<LoginForm />} />
          {loggedUser ? (
            <Route path="/edycja" element={<Edit />} />
          ) : (
            <Route path="*" element={<div>Brak szukanego adresu</div>} />
          )}
          {loggedUser ? (
            <Route path="/edycja/:idPokemon" element={<EditSimplePokemon />} />
          ) : (
            <Route path="*" element={<div>Brak szukanego adresu</div>} />
          )}
          {}
        </Routes>
      </S.Wrapper>
    </BrowserRouter>
  )
}

export default App
