import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-right: 2rem;
    background: #FFFFFF;
    border-radius: 5px;
    color: black;
    border: 1px solid black;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.14em;
    text-transform: uppercase;

    &:hover {
      color: #fff;
    }
  }
`;