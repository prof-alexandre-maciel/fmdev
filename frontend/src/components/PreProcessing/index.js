import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, LmsText, Table,
  FirstHeaderColumn, HeaderColumn,
  FirstItemColumn, ItemColumn, DetailText, RowDetail
} from './styles';
import Button from '../../styles/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import MoreIcon from 'react-feather/dist/icons/more-horizontal';
import AlertIcon from 'react-feather/dist/icons/alert-triangle';
import TargetIcon from 'react-feather/dist/icons/crosshair';
import Progress from '../Progress';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { INDICATORS, TRAIN } from '../../constants';
import { Creators as ScreenActions } from '../../store/ducks/screen';

class PreProcessing extends Component {

  state = {
    data: [
      { id: 1, indicator: "Teste", importance: 0.8, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 2, indicator: "Alunos", importance: 0.5, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 3, indicator: "Alunos", importance: 0.4, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 4, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 5, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 6, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 7, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 8, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 9, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 10, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 11, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 12, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 13, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 14, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 15, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 16, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 17, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 18, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 19, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 20, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 21, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 22, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
    ],
    expandedRows: []
  };

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded ?
      currentExpandedRows.filter(id => id !== rowId) :
      currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const itemRows = [
      <tr onClick={this.handleRowClick.bind(this, item.id)} key={"row-data-" + item.id}>
        <FirstItemColumn><Checkbox onChange={() => { }} /></FirstItemColumn>
        <ItemColumn>{item.indicator}</ItemColumn>
        <ItemColumn><AlertIcon size={20} color="#FFF" fill="#A87878" /></ItemColumn>
        <ItemColumn><TargetIcon size={20} color="#DEB981" /></ItemColumn>
        <ItemColumn><Progress value={item.importance} /></ItemColumn>
        <ItemColumn>{item.type}</ItemColumn>
        <ItemColumn>{item.lines}</ItemColumn>
        <ItemColumn>{item.anomalies}</ItemColumn>
        <ItemColumn style={{ display: 'flex', justifyContent: 'center' }}><MoreIcon /></ItemColumn>
      </tr >
    ];

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(
        <RowDetail key={"row-expanded-" + item.id}>
          {/* <FirstItemColumn style={{ paddingTop: '.7rem' }} colSpan={4}>
            <DetailText><b>HISTOGRAMA</b></DetailText>
          </FirstItemColumn> */}

          <FirstItemColumn vAlign="top" colSpan={1}>
          </FirstItemColumn>

          <ItemColumn colSpan={3}>
            <DetailText><b>MÉDIA: </b>0.6</DetailText>
            <DetailText style={{ paddingTop: '.5vh' }}><b>MEDIANA: </b>1.6</DetailText>
            <DetailText style={{ paddingTop: '.5vh' }}><b>DESVIO PADRÃO: </b>0.25</DetailText>
            <DetailText style={{ paddingTop: '.5vh' }}><b>QUARTILE: </b>0.25</DetailText>

            <DetailText style={{ paddingTop: '1rem', fontSize: '13px' }}>Q1: Menor ou igual à 25%</DetailText>
            <DetailText style={{ fontSize: '13px' }}>Q2: Entre 25.1% e 50% (até a mediana)</DetailText>
            <DetailText style={{ fontSize: '13px' }}>Q3: 51% à 75% (acima da mediana)</DetailText>
            <DetailText style={{ fontSize: '13px' }}>Q4: Acima de 75%</DetailText>
          </ItemColumn>

          <ItemColumn vAlign="top" colSpan={1}>
            <DetailText><b>MIN: </b>0.02</DetailText>
            <DetailText style={{ paddingTop: '.5vh' }}><b>MÁX: </b>1.02</DetailText>
          </ItemColumn>

          <ItemColumn colSpan={3}>
            <DetailText><b>ANOMALIAS: </b></DetailText>
            <DetailText>- Coluna com dados nulo</DetailText>
          </ItemColumn>

          <ItemColumn colSpan={1}>
            <Button>PRÉ-PROCESSAR</Button>
          </ItemColumn>

        </RowDetail >
      );
    }

    return itemRows;
  }


  render() {
    const { data } = this.state;
    const { setScreen } = this.props;

    return (
      <PerfectScrollbar style={{ width: '100%' }}>
        <ConfigContainer size='big'>

          <BreadCrumb text='Voltar para Seleção de indicadores' destiny={INDICATORS} />

          <Header>
            <h1>Escolha o indicador alvo para predição</h1>
            <div>
              <Button onClick={setScreen.bind(this, TRAIN)}>Selecionar Modelos</Button>
            </div>
          </Header>

          <LmsText>
            <span>LMS - Moodle</span>
          </LmsText>



          <Table>
            <thead>
              <tr>
                <FirstHeaderColumn>&nbsp;</FirstHeaderColumn>
                <HeaderColumn>Indicadores</HeaderColumn>
                <HeaderColumn>&nbsp;</HeaderColumn>
                <HeaderColumn>&nbsp;</HeaderColumn>
                <HeaderColumn>Importância</HeaderColumn>
                <HeaderColumn>Tipo</HeaderColumn>
                <HeaderColumn>Qtd. Linhas</HeaderColumn>
                <HeaderColumn>Anomalias</HeaderColumn>
                <HeaderColumn style={{ display: 'flex', justifyContent: 'center' }}>Ações</HeaderColumn>
              </tr>
            </thead>

            <tbody>
              {data.map(item => this.renderItem(item))}
            </tbody>
          </Table>

        </ConfigContainer >
      </PerfectScrollbar>
    )
  }
}

export default connect(
  null,
  { ...ScreenActions }
)(PreProcessing);