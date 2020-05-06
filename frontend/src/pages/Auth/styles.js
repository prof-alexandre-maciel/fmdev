import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  height: 100%;
  background: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20vh;
`;

export const Image = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const SignForm = styled.form`
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
    color: #4A5173;
    justify-content: center;
  }

  span {
    color: #000;
    font-size: 16px;
    line-height: 31px;
    letter-spacing: 0.07em;
    margin-top: 15px;
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