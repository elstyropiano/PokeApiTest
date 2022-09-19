import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '@mui/material/Button'
export const S = {
  Link: styled(Link)`
    text-decoration: none;
  `,
  Button: styled(Button)`
    width: 200px;

    &:hover {
      transform: scale(1.1);
      transition: ease-in-out 0.3s;
    }
    @media (max-width: 1281px) {
      width: 300px;
    }
    @media (max-width: 768px) {
      width: 220px;
    }
  `,
  Li: styled.li`
    margin-left: 16px;
    @media (max-width: 1281px) {
      margin: 8px 0;
    }
  `,
}
