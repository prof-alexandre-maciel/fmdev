import React, { Component } from 'react';

import { Container, Content } from './styles';

export default class Progress extends Component {

  getImportance = fullWidth => {
    const { value } = this.props;

    return value * fullWidth;
  }

  render() {
    const fullWidth = 6;
    const importance = this.getImportance(fullWidth);

    return (
      <Container>
        <Content style={{ width: `${importance}vw` }} />
      </Container>
    );
  }
}
