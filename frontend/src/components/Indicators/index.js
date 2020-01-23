import React, { Component, Fragment } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';

import { Content } from './styles';
import Button from '../../styles/Button';

export default class Indicators extends Component {
  render() {
    return (
      <Fragment>
        <ConfigContainer>
          <Content>
            <h1>Selecione os indicadores</h1>
            <div>
              <Button>Continuar</Button>
            </div>
          </Content>
        </ConfigContainer>
      </Fragment>
    );
  }
}
