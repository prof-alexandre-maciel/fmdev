import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-right: 2rem;
  }
`;

export const TrainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2rem;
  margin-right: 2rem;
  color: #4A5173;
  font-size: 13px;
  line-height: 23px;
`;

export const EmptyTrainInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  color: #CCC;
  font-size: 20px;
  line-height: 23px;
`;

export const Table = styled.table`
  color: black;
  width: 100%;
  border-spacing: 0;
  padding-top: 1rem;

  tr:nth-child(even) {
    background-color: #FAFAFA;
  }

  button {
    background: transparent;
    color: black;
    border: 1px solid black;

    &:hover {
      color: #FFF;
    }
  }
`;

export const FirstHeaderColumn = styled.td`
  padding: .7rem;
  padding-left: 2rem;
  font-weight: bold;
`;

export const HeaderColumn = styled.td`
  padding: .7rem;
  font-weight: bold;
`;

export const FirstItemColumn = styled.td`
  padding-left: 2rem;
`;

export const ItemColumn = styled.td`
  padding: .7rem;
`;