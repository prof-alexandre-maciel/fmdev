import styled from 'styled-components';

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
    font-weight: 800;
    font-size: 18px;
    line-height: 31px;
    letter-spacing: 0.07em;
    justify-content: center;
  }

  h2 {
    font-size: 11px;
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