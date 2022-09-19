import styled from 'styled-components'

export const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 70px;

    position: relative;
  `,
  FormWrapper: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    border-radius: 10px;
    padding: ${({ pokemonWasCreate }) =>
      pokemonWasCreate ? '70px 20px 110px 20px' : '20px 20px 30px 20px'};
    background-color: ${({ color }) => color};
    width: 600px;
    align-items: center;
    @media (max-width: 768px) {
      width: 400px;
    }
  `,
  ValidationErrorMessage: styled.span`
    color: #d32f2f;
  `,
  H1: styled.h1`
    color: ${({ color }) => color};
    width: 100%;
    text-align: center;
  `,
}
