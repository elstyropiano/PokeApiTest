import { S } from './FightStats.styled'
import { useTheme } from '@mui/material'
import Context from '../../Context'
import { useContext } from 'react'
const Fightstats = ({ wins, loses }) => {
  const { palette } = useTheme()
  const { themeColor } = useContext(Context)
  return (
    <S.Wrapper color={palette[themeColor].navBar}>
      <S.Div>
        <S.ShortcutSpan>W:</S.ShortcutSpan>
        <S.Span>{`${wins}`}</S.Span>
      </S.Div>
      <S.Div>
        <S.ShortcutSpan>L:</S.ShortcutSpan>
        <S.Span>{`${loses}`}</S.Span>
      </S.Div>
    </S.Wrapper>
  )
}

export default Fightstats
