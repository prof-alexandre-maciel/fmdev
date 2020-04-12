import styled from 'styled-components';

export const Container = styled.aside`
  background: #4A5173;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.button`
  border: 0;
  background: transparent;
  margin: 0 0 8px;

  img {
    transition: all 0.2s;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

export const Item = styled.button`
  border: 0;
  background: transparent;
  margin: 0 0 8px;
  margin-top: 2vh;
`;

export const ItemText = styled.span`
  font-size: 16px;
  line-height: 22px;
  color: #FFFCF8;
`;