import React, { Component } from 'react';

import { Container } from './styles';
import { connect } from 'react-redux';

import SideMenu from '../../components/SideMenu';
import PreProcessing from '../../components/PreProcessing';

class Main extends Component {

  render() {
    return (
      <Container>
        <SideMenu />
        <PreProcessing />
      </Container>
    )
  }
}

export default connect(null, null)(Main);