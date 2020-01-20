import React from 'react';
import { Container, Content } from './styles';

const Modal = ({ children, size }) => (
  <Container>
    <Content size={size}>{children}</Content>
  </Container>
)

export default Modal;