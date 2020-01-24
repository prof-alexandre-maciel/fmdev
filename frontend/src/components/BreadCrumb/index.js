import React, { Component } from 'react';
import BackIcon from 'react-feather/dist/icons/arrow-left';

import { Container, Text } from './styles';

class BreadCrumb extends Component {
  render() {
    const { text } = this.props;


    return (
      <Container>
        <BackIcon size={16} />
        <Text>{text}</Text>
      </Container>
    );
  }
}

export default BreadCrumb