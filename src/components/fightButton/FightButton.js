import { S } from './FightButton.styled'
import { useTheme } from '@mui/material'
import { useContext } from 'react'
import Context from '../../Context'
import sword from '../../images/swords.png'

const FightButton = ({ arenaMembers, handleButton }) => {
  const { palette } = useTheme()
  const { themeColor } = useContext(Context)

  return (
    <S.Button
      disabled={arenaMembers.length !== 2}
      color={palette[themeColor].contrastText}
      onClick={handleButton}
    >
      <S.Img src={sword} />
      <S.H1 color={palette[themeColor].contrastText}>Walcz</S.H1>
    </S.Button>
  )
}

export default FightButton
