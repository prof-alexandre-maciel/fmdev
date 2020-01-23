import React, { Component } from 'react';

import { Container } from './styles';
import { connect } from 'react-redux';

import SideMenu from '../../components/SideMenu';
import Indicators from '../../components/Indicators';

class Main extends Component {

  render() {
    return (
      <Container>
        <SideMenu />
        <Indicators />
      </Container>
    )
  }
}

export default connect(null, null)(Main);