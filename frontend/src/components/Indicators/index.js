import React, { Component, Fragment } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';

import {
  Header, ComboBoxStyle,
  Separator, Content, LeftContent,
  IndicatorContainer, RightContainer,
  RightHeader
} from './styles';
import Button from '../../styles/Button';

import {
  ComboBox,
  Checkbox
} from 'office-ui-fabric-react/lib/index';

const INITIAL_OPTIONS = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' }
];

class Indicators extends Component {
  render() {
    return (
      <Fragment>
        <ConfigContainer>
          <Header>
            <h1>Selecione os indicadores</h1>
            <div>
              <Button>Continuar</Button>
            </div>
          </Header>

          <Content>
            <LeftContent>
              <ComboBox
                label="Selecione um curso"
                autoComplete="on"
                options={INITIAL_OPTIONS}
                styles={ComboBoxStyle}
              />

              <ComboBox
                label="Selecione uma disciplina"
                autoComplete="on"
                options={INITIAL_OPTIONS}
                styles={ComboBoxStyle}
              />

              <ComboBox
                label="Selecione uma turma"
                autoComplete="on"
                options={INITIAL_OPTIONS}
                styles={ComboBoxStyle}
              />
            </LeftContent>

            <Separator>&nbsp;</Separator>

            <RightContainer>
              <RightHeader>
                <span>Selecione os indicadores  para continuar</span>
              </RightHeader>

              <IndicatorContainer>
                <Checkbox label="Indicador 1" onChange={() => { }} />
                <Checkbox label="Indicador 2" onChange={() => { }} />
                <Checkbox label="Indicador 3" onChange={() => { }} />
                <Checkbox label="Indicador 4" onChange={() => { }} />
                <Checkbox label="Indicador 5" onChange={() => { }} />
                <Checkbox label="Indicador 6" onChange={() => { }} />
                <Checkbox label="Indicador 7" onChange={() => { }} />
                <Checkbox label="Indicador 8" onChange={() => { }} />
                <Checkbox label="Indicador 9" onChange={() => { }} />
                <Checkbox label="Indicador 10" onChange={() => { }} />
                <Checkbox label="Indicador 11" onChange={() => { }} />
                <Checkbox label="Indicador 12" onChange={() => { }} />
                <Checkbox label="Indicador 13" onChange={() => { }} />
                <Checkbox label="Indicador 14" onChange={() => { }} />
                <Checkbox label="Indicador 15" onChange={() => { }} />
                <Checkbox label="Indicador 16" onChange={() => { }} />
                <Checkbox label="Indicador 17" onChange={() => { }} />
                <Checkbox label="Indicador 18" onChange={() => { }} />
                <Checkbox label="Indicador 19" onChange={() => { }} />
                <Checkbox label="Indicador 20" onChange={() => { }} />

              </IndicatorContainer>

            </RightContainer>

          </Content>
        </ConfigContainer>
      </Fragment>
    );
  }
}

export default Indicators;
