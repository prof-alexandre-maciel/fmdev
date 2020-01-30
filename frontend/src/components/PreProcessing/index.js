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

class PreProcessing extends Component {

  state = {
    data: [
      { id: 1, date: "2014-04-18", total: 121.0, status: "Shipped", name: "A", points: 5, percent: 50 },
      { id: 2, date: "2014-04-21", total: 121.0, status: "Not Shipped", name: "B", points: 10, percent: 60 },
      { id: 3, date: "2014-08-09", total: 121.0, status: "Not Shipped", name: "C", points: 15, percent: 70 },
      { id: 4, date: "2014-04-24", total: 121.0, status: "Shipped", name: "D", points: 20, percent: 80 },
      { id: 5, date: "2014-04-26", total: 121.0, status: "Shipped", name: "E", points: 25, percent: 90 },
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
        <FirstItemColumn>{item.date}</FirstItemColumn>
        <ItemColumn>{item.total}</ItemColumn>
        <ItemColumn>{item.status}</ItemColumn>
      </tr>
    ];

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(
        <tr key={"row-expanded-" + item.id} >
          <TableDetail colSpan={3}>
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
          <tr>
            <FirstHeaderColumn>Data</FirstHeaderColumn>
            <HeaderColumn>Total</HeaderColumn>
            <HeaderColumn>Status</HeaderColumn>
          </tr>

          {data.map(item => this.renderItem(item))}
        </Table>

      </ConfigContainer>
    )
  }
}

export default PreProcessing