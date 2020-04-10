import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, Table,
  FirstHeaderColumn, HeaderColumn,
  FirstItemColumn, ItemColumn, TrainInfo,
  EmptyTrainInfo
} from './styles';
import Button from '../../styles/Button';
import { PRE_PROCESSING } from '../../constants';
import { connect } from 'react-redux';

class Train extends Component {

  state = {
    data: [
      { id: 1, step: "Treinamento 1/5", status: 'Finalizado', date: '02/02/2020', score: 0.88, time: '02:00' },
      { id: 2, step: "Treinamento 2/5", status: 'Finalizado', date: '02/02/2020', score: 0.90, time: '03:00' },
      { id: 3, step: "Treinamento 3/5", status: 'Finalizado', date: '02/02/2020', score: 0.92, time: '01:10' },
      { id: 4, step: "Treinamento 4/5", status: 'Finalizado', date: '02/02/2020', score: 0.87, time: '02:00' },
      { id: 5, step: "Treinamento 5/5", status: 'Progresso', date: '02/02/2020', score: null, time: null },
    ],
    isRunning: false,
    isFinished: false
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

  getSplit = (value) => {
    const { data } = this.props.pre_processing;

    return ~~((data[0].count * this.props.screen.data[value]) / 100);
  }


  render() {
    const { train, test } = this.props.screen.data;
    const { isRunning, isFinished } = this.state;
    const { data } = this.props.pre_processing;

    return (
      <ConfigContainer size='big' style={{ color: '#000' }}>

        <BreadCrumb text='Voltar para pré-processamento' destiny={PRE_PROCESSING} />

        <Header>
          <h1>Treinamento</h1>
          <div>
            {isFinished ? <Button filled={false}>Ver Métricas</Button> : null}
            {isFinished ? <Button filled={false}>Ver Métricas</Button> : null}
            <Button>REALIZAR TREINAMENTO</Button>
          </div>
        </Header>

        {data && data.length > 0 ?
          <TrainInfo>
            <div>LMS - Moodle: Instâncias {data[0].count}</div>
            <div>Treinamento: {train}% ({this.getSplit('train')}) | Testes: {test}% ({this.getSplit('test')})</div>
          </TrainInfo>
          : null}

        {!isRunning && !isFinished ? <EmptyTrainInfo>Inicie o treinamento para visualizar o progresso.</EmptyTrainInfo> : null}

        {
          isRunning ?
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
                {this.state.data.map(item => this.renderItem(item))}
              </tbody>
            </Table>
            : null
        }

      </ConfigContainer >
    )
  }
}

const mapStateToProps = ({ screen, pre_processing }) => ({ screen, pre_processing });

export default connect(mapStateToProps, null)(Train);