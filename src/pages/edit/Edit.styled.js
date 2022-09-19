import styled from 'styled-components'

export const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 30px;
  `,
  PokemonList: styled.div`
    margin: 30px 0 50px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `,
  Description: styled.h2`
    text-align: center;
    width: 80%;
    color: ${({ color }) => color};
  `,
}
