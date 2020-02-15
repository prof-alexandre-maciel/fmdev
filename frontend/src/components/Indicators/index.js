import { connect } from 'react-redux';
import BreadCrumb from '../BreadCrumb';
import Button from '../../styles/Button';
import React, { Component, Fragment } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import {
  Header,
  Separator, Content, LeftContent,
  IndicatorContainer, RightContainer,
  RightHeader
} from './styles';
import { ComboBox, Checkbox } from 'office-ui-fabric-react/lib/index';
import { LMS_SELECT, PRE_PROCESSING } from '../../constants';
import { ComboBoxStyle } from '../../styles/global';

const INITIAL_OPTIONS = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' }
];

class Indicators extends Component {


  render() {
    const { setScreen } = this.props;

    return (
      <Fragment>
        <ConfigContainer size='big'>
          <BreadCrumb text='Voltar para ESCOLHA LMS' destiny={LMS_SELECT} />
          <Header>
            <h1>Selecione os indicadores</h1>
            <div>
              <Button onClick={setScreen.bind(this, PRE_PROCESSING)}>Continuar</Button>
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


export default connect(
  null,
  { ...ScreenActions }
)(Indicators);