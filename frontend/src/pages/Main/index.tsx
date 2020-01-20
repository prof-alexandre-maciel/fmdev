import React from 'react';

import SideMenu from '../../components/SideMenu';
import { Container } from './styles';
import LmsSelect from '../../components/LmsSelect';

const Main = () => (
  <Container>
    <SideMenu />
    <LmsSelect />
  </Container>
)

export default Main;