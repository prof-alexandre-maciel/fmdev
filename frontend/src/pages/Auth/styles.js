import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  height: 100%;
  background: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
  }

  span {
    color: #000;
    font-size: 16px;
    line-height: 31px;
    letter-spacing: 0.07em;
    margin-top: 15px;
  }

  input {
    height: 50px;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    transition: border 0.15s ease;
    font-size: 16px;

    &:focus {
      border-color: #7289da;
    }
  }

  button {
    margin: 20px 0 0;
    color: #4A5173;
    background-color: #FFF;
    border: 1px solid #4A5173;

    &:hover {
      color: #FFF;
    }
  }
`