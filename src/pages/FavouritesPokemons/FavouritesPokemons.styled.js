import styled from 'styled-components'

export const S = {
  Wrapper: styled.div`
    align-items: stretch;
    background-color: ${({ color }) => color};
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${({ empty }) => (empty ? 'column' : 'row')};
    justify-content: center;
    margin-top: 100px;
    height: 100%;
  `,
  Img: styled.img`
    height: 400px;
  `,
}
