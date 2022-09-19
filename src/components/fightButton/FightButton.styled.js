import styled from 'styled-components'

export const S = {
  Button: styled.button`
    background-color: ${({ color }) => color};
    padding: 10px;
    height: 150px;
    border-radius: 5px;
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    &:disabled {
      opacity: 0.7;
    }
    &:hover {
      animation: ${({ disabled }) => (disabled ? 'none' : 'shake 0.5s')};
      animation-iteration-count: infinite;
      @keyframes shake {
        0% {
          transform: translate(1px, 1px) rotate(0deg);
        }
        10% {
          transform: translate(-1px, -2px) rotate(-1deg);
        }
        20% {
          transform: translate(-3px, 0px) rotate(1deg);
        }
        30% {
          transform: translate(3px, 2px) rotate(0deg);
        }
        40% {
          transform: translate(1px, -1px) rotate(1deg);
        }
        50% {
          transform: translate(-1px, 2px) rotate(-1deg);
        }
        60% {
          transform: translate(-3px, 1px) rotate(0deg);
        }
        70% {
          transform: translate(3px, 1px) rotate(-1deg);
        }
        80% {
          transform: translate(-1px, -1px) rotate(1deg);
        }
        90% {
          transform: translate(1px, 2px) rotate(0deg);
        }
        100% {
          transform: translate(1px, -2px) rotate(-1deg);
        }
      }
    }
  `,
  H1: styled.h1`
    color: ${({ color }) => color};
    letter-spacing: 4px;
  `,
  Img: styled.img`
    max-block-size: -webkit-fill-available;
  `,
}
