import React, { Component } from 'react';

import { Container, Card, CardContainer, Image } from './styles';

import moodle from '../../assets/moodle.svg';
import chamilo from '../../assets/chamilo.svg';
import open_edx from '../../assets/open_edx.svg';
import totara_learn from '../../assets/totara_learn.svg';

export default class LmsSelect extends Component {
  render() {
    return (
      <Container>
        <h1>Escolha o LMS que você vai trabalhar</h1>
        <CardContainer>
          <Card>
            <Image alt="" src={moodle} />
            <span>Última versão: 7.0.1</span>
          </Card>
          <Card>
            <Image alt="" disabled src={chamilo} />
            <span>Última versão: 7.0.1</span>
          </Card>
          <Card>
            <Image alt="" disabled src={open_edx} />
            <span>Última versão: 7.0.1</span>
          </Card>
          <Card>
            <Image alt="" disabled src={totara_learn} />
            <span>Última versão: 7.0.1</span>
          </Card>
        </CardContainer>
      </Container>
    );
  }
}
