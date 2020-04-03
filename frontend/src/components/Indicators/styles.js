import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-right: 2rem;
  }
`;

export const SelectContainer = styled.div`
  padding-bottom: 3vh;
  width: 100%;
`;

export const SelectText = styled.div`
  font-style: normal;
  font-weight: normal;
  color: #000000;
  padding-bottom: .5vh;
`;

export const Content = styled.div`
  display: flex;
  margin: 2rem;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 16vw;
  max-width: 16vw;
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
`;