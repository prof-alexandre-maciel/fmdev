import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-right: 2rem;
    background: transparent;
    border-radius: none;
    color: black;
    border: 1px solid #4A5173;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4A5173;


    &:hover {
      color: #fff;
    }
  }
`;

export const ComboBoxStyle = {
  container: {
    marginBottom: '1rem'
  },
  root: {
    backgroundColor: '#F5F5F5',
  },
  input: {
    backgroundColor: '#F5F5F5',
  }
}

export const Content = styled.div`
  display: flex;
  margin: 2rem;
`;

export const LeftContent = styled.div`
display: flex;
flex-direction: column;
width: 15vw;
`;

export const Separator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2vw;
  border-left: 2px dotted #000;
`;

export const RightContainer = styled.div`
  margin-left: 1.5rem;
`;

export const RightHeader = styled.div`
  display: flex;
  margin-bottom: .5rem;

  span {
    text-align: left;
    font-size: 16px;
    line-height: 21px;
    color: #000000;
  }
`

export const IndicatorContainer = styled.div`
  display: grid;
  background-color: #F3F3F3;
  padding: 1rem;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;