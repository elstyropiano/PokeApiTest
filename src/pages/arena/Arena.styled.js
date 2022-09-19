import styled from 'styled-components'
import stadion from '../../images/pokemonStadion.png'

export const S = {
  Placeholder: styled.div`
    align-items: center;
    background-color: ${({ color }) => color};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 400px;
    justify-content: center;
    width: 310px;
    -webkit-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    -moz-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
  `,

  PlaceholderWrapper: styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-evenly;
  `,
  Wrapper: styled.div`
    background-image: url(${stadion});
    background-repeat: round;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: relative;
    width: 100%;
  `,
  BackHomeWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
}
