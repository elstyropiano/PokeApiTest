import { S } from './SimpleNavButton.styled'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../../Context'

const SimpleNavButton = ({ text, setLoggedUser }) => {
  const navigate = useNavigate()
  const { themeColor } = useContext(Context)

  const handleButton = () => {
    if (setLoggedUser) {
      localStorage.removeItem('logged')
      setLoggedUser(null)
      navigate('/')
    }
  }

  return (
    <S.Li>
      <S.Link to={text === 'Wyloguj' ? '/' : `/${text.toLowerCase()}`}>
        <S.Button
          variant="contained"
          color={themeColor}
          size="large"
          onClick={handleButton}
        >
          {text}
        </S.Button>
      </S.Link>
    </S.Li>
  )
}

export default SimpleNavButton
