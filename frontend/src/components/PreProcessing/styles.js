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

export const LmsText = styled.div`
  display: flex;
  margin-left: 2rem;
  color: #000;
  font-size: 14px;
  line-height: 23px;
`;

export const Table = styled.table`
  color: black;
  width: 100%;
  border-spacing: 0;
  padding-top: 1rem;

  tr {
    cursor: pointer;
  }

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

export const DetailText = styled.div`
  font-size: 14px;
  line-height: 21px;
`;

export const RowDetail = styled.tr`
  background-color: #F3F3F3;
  width: 100%;
  height: 20vh;
  padding-left: 2rem;

  > td {
    vertical-align: top;
    &:hover {
      cursor: default;
    }
  }
`;