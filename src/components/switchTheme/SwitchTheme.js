import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import { useContext } from 'react'
import Context from '../../Context'
import { useTheme } from '@mui/material'
const GreenSwitch = styled(props => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ color }) => ({
  position: 'absolute',
  top: 11,
  right: 30,
  width: 56,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(28px)',
      color: '#FFBB00',
      '& + .MuiSwitch-track': {
        backgroundColor: color === 'dark' ? 'blue' : '#34A853',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: 'blue',
      border: '6px solid #eee',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: color === 'dark' ? 'red' : 'blue',
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: color === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: color === 'light' ? 'white' : '#1689e0',
    opacity: 1,
    // transition: theme.transitions.create(['background-color'], {
    //   duration: 500,
    // }),
  },
}))
// const changeTheme = () => {
//   console.log(themeColor)
// }
const label = { inputProps: { 'aria-label': 'Color switch demo' } }

const SwitchTheme = () => {
  const { palette } = useTheme()
  const { themeColor, setThemeColor } = useContext(Context)
  const changeTheme = () => {
    const theme = themeColor === 'dark' ? 'light' : 'dark'
    setThemeColor(theme)
  }
  return <GreenSwitch {...label} onClick={changeTheme} />
}

export default SwitchTheme
