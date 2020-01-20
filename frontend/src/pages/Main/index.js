import React, { Component } from 'react';

import { Container } from './styles';
import { connect } from 'react-redux';

import SideMenu from '../../components/SideMenu';
import LmsSelect from '../../components/LmsSelect';

class Main extends Component {

  render() {
    return (
      <Container>
        <SideMenu />
        <LmsSelect />
      </Container>
    )
  }
}

export default connect(null, null)(Main);