import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const S = {
  Wrapper: styled.div`
    width: 60%;
    border-radius: 10px;
    height: 100px;
    display: flex;
    align-items: center;
    background-color: ${({ color }) => color};
    padding: 20px;
    box-sizing: border-box;
    margin-top: 10px;
    justify-content: space-between;
  `,
  Link: styled(Link)`
    text-decoration: none;
  `,
}
