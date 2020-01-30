import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 1rem;
  padding-bottom: 0;
  align-items: center;
  color: #4A5173;
  

  &:hover {
    cursor: pointer;
  }
`;

export const Text = styled.span`
  font-size: 12px;
  margin-left: .2rem;
  line-height: 16px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: 0.15s ease;

  &:hover {
    font-weight: bold;
  }
`