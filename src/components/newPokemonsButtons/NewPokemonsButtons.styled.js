import styled from '@emotion/styled'
import { Button } from '@mui/material'
export const S = {
  CreateButton: styled(Button)`
    position: absolute;
    bottom: 30px;
    margin-top: 20px;
    height: 55px;
    width: 600px;
    @media (max-width: 768px) {
      width: 400px;
    }
  `,
  Next: styled(Button)`
    position: absolute;
    top: 0px;
    right: 0px;
  `,
  Previous: styled(Button)`
    position: absolute;
    top: 0px;
    left: 0px;
  `,
}
