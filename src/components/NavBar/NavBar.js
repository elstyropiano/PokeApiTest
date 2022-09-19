import SimpleNavButton from '../simpleNavButton/SimpleNavButton'
import { S } from './NavBar.styled'
import Context from '../../Context'
import Logo from '../logo/Logo'
import { useEffect, useState, useContext } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import { useTheme } from '@mui/material'
import SwitchTheme from '../switchTheme/SwitchTheme'
const NavBar = () => {
  const { palette } = useTheme()
  const { loggedUser, setLoggedUser, themeColor } = useContext(Context)
  const [buttonsTextArray, setButtonsTextArray] = useState([])

  useEffect(() => {
    const buttonsTextArray = loggedUser
      ? ['Ulubione', 'Arena', 'Edycja']
      : ['Ulubione', 'Arena', 'Logowanie', 'Rejestracja']
    setButtonsTextArray(buttonsTextArray)
  }, [loggedUser])
  console.log(themeColor, 'theme w navbar')
  return (
    <S.Wrapper color={palette[themeColor].navBar}>
      <SwitchTheme />
      <Logo />
      {loggedUser && (
        <S.LoggedUserName color={palette[themeColor].contrastText}>
          <PersonIcon />
          {loggedUser.name}
        </S.LoggedUserName>
      )}
      <S.Ul>
        {buttonsTextArray.map(text => (
          <SimpleNavButton key={text} text={text} />
        ))}
        {loggedUser && (
          <SimpleNavButton setLoggedUser={setLoggedUser} text="Wyloguj" />
        )}
      </S.Ul>
    </S.Wrapper>
  )
}
export default NavBar
