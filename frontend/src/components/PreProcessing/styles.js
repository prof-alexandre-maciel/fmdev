import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-right: 2rem;
    border-radius: none;
    color: black;
    background: #DEB981;
    border: 1px solid #DEB981;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: normal;
    color: #FFF;


    &:hover {
      color: #FFF;
      border: 1px solid #4A5173;
    }
  }
`;