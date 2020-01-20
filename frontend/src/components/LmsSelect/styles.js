import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 15vh;
  margin-bottom: 20vh;
  margin-left: 20vw;
  width: 60%;


  h1 {
    padding: 2rem;
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
    color: #4A5173;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
`

export const Image = styled.img`
  width: 8vw;
  height: 10vh;

  ${props => props.disabled === true && css`
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

  color: #000;
  height: 20vh;

  span {
    font-weight: 300;
    font-size: 1.4vh;
    line-height: 1vh;
    color: #000000;
  }
`;