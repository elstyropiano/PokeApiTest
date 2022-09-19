import styled from 'styled-components'
import TextField from '@mui/material/TextField'

export const S = {
  Wrapper: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
  `,
  NoResults: styled.h1`
    color: ${({ color }) => color};
    margin: 100px;
  `,
  TextField: styled(TextField)`
    margin: 30px 0;
    width: 660px;
    @media (max-width: 768px) {
      width: 440px;
    }
  `,
}
