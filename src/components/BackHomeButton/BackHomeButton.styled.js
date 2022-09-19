import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

export const S = {
  Link: styled(Link)`
    text-decoration: none;
    width: 640px;
    margin: 20px 0;
    border-radius: 333px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      width: 440px;
    }
  `,
  Button: styled(Button)`
    width: 100%;
    height: 42px;

    &:hover {
      transform: scale(1.03);
      transition: ease-in-out 0.3s;
    }
  `,
}
