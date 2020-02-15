import styled, { css } from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
`

export const Image = styled.img`
  width: 8vw;
  height: 10vh;
  cursor: pointer;

  ${props => props.disabled && css`
    mix-blend-mode: luminosity;
    opacity: 0.7;
    `}
`;

export const Card = styled.div`
  display: flex;
  background: #FBFBFB;
  box-sizing: border-box;
  margin-left: 2rem;
  padding: 1rem;
  margin-top: 1vh;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 10vw;
  height: 10vh;

  color: #000;
  height: 20vh;
`;

export const CardVersion = styled.span`
    font-weight: 300;
    font-size: .8rem;
    line-height: 1vh;
    color: #000000;

    ${props => props.disabled === true && css`
      mix-blend-mode: luminosity;
      opacity: 0.5;
    `}
`;

export const DialogInput = styled.input`
    padding: 10px;
    border-radius: 3px;
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    transition: border 0.15s ease;
    font-size: 16px;
    border: 1px solid #FFF;

    &:focus {
      border: 1px solid #000;
    }
`;

export const DialogSpan = styled.span`
    font-size: 16px;
    line-height: 31px;
    letter-spacing: 0.07em;
    margin-top: 15px;
`;


export const DialogForm = styled.form`
  border-radius: 5px;
  padding: 40px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  h1 {
    font-weight: 500;
    margin: 0 0 10px;
    font-weight: 800;
    font-size: 18px;
    line-height: 31px;
    letter-spacing: 0.07em;
    justify-content: center;
  }

  button {
    margin: 30px 0 0;
    color: #4A5173;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background-color: #FFF;
    border: 1px solid #4A5173;

    &:hover {
      color: #FFF;
    }
  }
`

export const DialogFormButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;