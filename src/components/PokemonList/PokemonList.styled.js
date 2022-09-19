import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const S = {
  Link: styled(Link)`
    color: ${({ color }) => color};
    text-decoration: none;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
}
