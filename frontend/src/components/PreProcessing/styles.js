import styled from 'styled-components';

export const DataSourceText = styled.div`
  display: flex;
  margin-left: 2rem;
  color: #000;
  font-size: 14px;
  line-height: 23px;
`;

export const RowDetail = styled.tr`
  background-color: #F3F3F3;
  width: 100%;
  height: 20vh;

  > td {
    vertical-align: top;
    &:hover {
      cursor: default;
    }
  }
`;