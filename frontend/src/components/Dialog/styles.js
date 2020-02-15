import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  color: #000;
  border-radius: 5px;
  box-shadow: 40px;
  width: ${props => (props.size === 'big' ? 600 : 400)}
`;