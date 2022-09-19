import styled from 'styled-components'

export const S = {
  Wrapper: styled.div`
    align-items: center;
    background-color: ${({ color }) => color};
    box-sizing: border-box;
    color: white;
    display: flex;
    padding: 30px 30px;
    justify-content: flex-end;
    position: 'relative';
    width: 100%;
  `,
  Ul: styled.ul`
    display: flex;
    list-style-type: none;
    @media (max-width: 1281px) {
      flex-direction: column;
    }
  `,
  LoggedUserName: styled.span`
    align-items: center;
    color: ${({ color }) => color};
    display: flex;
    font-size: 20px;
    position: absolute;
    top: 9px;
    right: 100px;
  `,
}
