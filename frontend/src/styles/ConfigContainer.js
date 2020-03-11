import styled, { css } from 'styled-components';

const sizes = {
  default: css`
    margin-top: 15vh;
    margin-bottom: 20vh;
    margin-left: 20vw;
    width: 60%;
  `,
  big: css`
    margin-top: 7vh;
    margin-bottom: 7vh;
    margin-left: 7vw;
    width: 85%;
  `
};

export const ConfigContainer = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  ${props => sizes[props.size || 'default']}
  
  h1 {
    padding: 2rem;
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
    color: #4A5173;
  }
`;