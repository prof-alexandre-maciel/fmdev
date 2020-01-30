import React, { Component } from 'react';

import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, LmsText, Table,
  FirstHeaderColumn, HeaderColumn,
  FirstItemColumn, ItemColumn, TableDetail
} from './styles';
import Button from '../../styles/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import MoreIcon from 'react-feather/dist/icons/more-horizontal';
import Progress from '../Progress';

class PreProcessing extends Component {

  state = {
    data: [
      { id: 1, indicator: "Alunos", importance: 0.8, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 2, indicator: "Alunos", importance: 0.5, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 3, indicator: "Alunos", importance: 0.4, type: "Discreto", lines: 88790, anomalies: 0 },
      { id: 4, indicator: "Alunos", importance: 0.2, type: "Discreto", lines: 88790, anomalies: 0 },
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
        <ItemColumn><Progress value={item.importance} /></ItemColumn>
        <ItemColumn>{item.type}</ItemColumn>
        <ItemColumn>{item.lines}</ItemColumn>
        <ItemColumn>{item.anomalies}</ItemColumn>
        <ItemColumn style={{ display: 'flex', justifyContent: 'center' }}><MoreIcon /></ItemColumn>
      </tr >
    ];

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(
        <tr key={"row-expanded-" + item.id} >
          <TableDetail colSpan={7}>
            Content
          </TableDetail>
        </tr>
      );
    }

    return itemRows;
  }


  render() {
    const { data } = this.state;

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

        <Table>
          <thead>
            <tr>
              <FirstHeaderColumn>&nbsp;</FirstHeaderColumn>
              <HeaderColumn>Indicadores</HeaderColumn>
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

      </ConfigContainer>
    )
  }
}

export default PreProcessing