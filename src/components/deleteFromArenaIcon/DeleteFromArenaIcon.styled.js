import ClearIcon from '@mui/icons-material/Clear'
import styled from 'styled-components'
export const S = {
  ClearIcon: styled(ClearIcon)`
    position: absolute;
    top: 0;
    right: 0;
    background-color: black;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      color: red;
    }
  `,
}
