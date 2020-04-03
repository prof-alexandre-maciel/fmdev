import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, Table,
  FirstHeaderColumn, HeaderColumn,
  FirstItemColumn, ItemColumn, TrainInfo
} from './styles';
import Button from '../../styles/Button';
import { PRE_PROCESSING } from '../../constants';

class Train extends Component {

  state = {
    data: [
      { id: 1, step: "Treinamento 1/5", status: 'Finalizado', date: '02/02/2020', score: 0.88, time: '02:00' },
      { id: 2, step: "Treinamento 2/5", status: 'Finalizado', date: '02/02/2020', score: 0.90, time: '03:00' },
      { id: 3, step: "Treinamento 3/5", status: 'Finalizado', date: '02/02/2020', score: 0.92, time: '01:10' },
      { id: 4, step: "Treinamento 4/5", status: 'Finalizado', date: '02/02/2020', score: 0.87, time: '02:00' },
      { id: 5, step: "Treinamento 5/5", status: 'Progresso', date: '02/02/2020', score: null, time: null },
    ],
  };

  renderItem(item) {
    const itemRows = [
      <tr key={"row-data-" + item.id}>
        <FirstItemColumn>{item.step}</FirstItemColumn>
        <ItemColumn>{item.status}</ItemColumn>
        <ItemColumn>{item.date}</ItemColumn>
        <ItemColumn>{item.score}</ItemColumn>
        <ItemColumn>{item.time}</ItemColumn>
      </tr>
    ];

    return itemRows;
  }


  render() {
    const { data } = this.state;

    return (
      <ConfigContainer size='big'>

        <BreadCrumb text='Voltar para pré-processamento' destiny={PRE_PROCESSING} />

        <Header>
          <h1>Treinamento</h1>
          <div>
            <Button filled={false}>Ver Métricas</Button>
            <Button>Executar Modelos</Button>
          </div>
        </Header>

        <TrainInfo>
          <div>LMS - Moodle: Instâncias 1000</div>
          <div>Treinamento: 70% (700) | Testes: 30% (300)</div>
        </TrainInfo>

        <Table>
          <thead>
            <tr>
              <FirstHeaderColumn>Etapa</FirstHeaderColumn>
              <HeaderColumn>Status</HeaderColumn>
              <HeaderColumn>Data</HeaderColumn>
              <HeaderColumn>Score</HeaderColumn>
              <HeaderColumn>Tempo em execução</HeaderColumn>
            </tr>
          </thead>

          <tbody>
            {data.map(item => this.renderItem(item))}
          </tbody>
        </Table>

      </ConfigContainer >
    )
  }
}

export default Train