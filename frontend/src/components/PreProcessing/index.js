import React, { Component } from 'react';

import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import { Header, LmsText } from './styles';
import Button from '../../styles/Button';

class PreProcessing extends Component {
  render() {
    return (
      <ConfigContainer size='big'>
        <BreadCrumb text='Voltar para Seleção de indicadores' />
        <Header>
          <h1>Escolha o indicador alvo para predição</h1>
          <div>
            <Button>Treinar base</Button>
          </div>
        </Header>

        <LmsText>
          <span>LMS - Moodle</span>
        </LmsText>
      </ConfigContainer>
    )
  }
}

export default PreProcessing