import React, { Component } from 'react';

import { Container, Content } from './styles';

export default class Progress extends Component {

  getBackgroundColor = () => {
    let color = '#488DA3';
    const { value } = this.props;

    if (value > 0) return color;

    return '#FA8B8B';
  }

  getImportance = fullWidth => {
    const { value } = this.props;

    return value * fullWidth;
  }

  render() {
    const fullWidth = 6;
    const { value } = this.props;
    const background = this.getBackgroundColor();
    const importance = this.getImportance(fullWidth);
    const transform = value > 0 ? 'rotate(0deg)' : 'rotate(180deg)';

    return (
      <Container style={{ transform }}>
        <Content
          background={background}
          style={{ width: `${importance}vw` }} />
      </Container>
    );
  }
}
