import styled from 'styled-components';

export const Container = styled.div`
  width: 6vw;
  height: 1.3vh;
  border-radius: 11px;
  position: relative;
  background: #E5E5E5;
`;


export const Content = styled.div`
  width: 3vw;
  height: 1.3vh;
  border-radius: 11px;
  position: absolute;
  background: ${props => props.background};
`;