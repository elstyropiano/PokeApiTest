import { S } from './BackHomeButton.styled'
import { useContext } from 'react'
import Context from '../../Context'

const BackHomeButton = () => {
  const { themeColor } = useContext(Context)

  return (
    <S.Link to="/">
      <S.Button variant="contained" color={themeColor}>
        Strona główna
      </S.Button>
    </S.Link>
  )
}

export default BackHomeButton
