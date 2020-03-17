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

    return Math.abs(value * fullWidth);
  }

  renderNumber = (value, prop) => {
    return <div style={{ fontSize: '.7rem', [prop]: '.3vw' }}>{value}</div>
  }

  render() {
    const fullWidth = 6;
    const { value } = this.props;
    const background = this.getBackgroundColor();
    const importance = this.getImportance(fullWidth);
    const transform = value > 0 ? 'rotate(0deg)' : 'rotate(180deg)';

    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {value < 0 ? this.renderNumber(value, 'paddingRight') : null}
        <Container style={{ transform }}>
          <Content
            background={background}
            style={{ width: `${importance}vw` }} />
        </Container>
        {value > 0 ? this.renderNumber(value, 'paddingLeft') : null}
      </div>
    );
  }
}
