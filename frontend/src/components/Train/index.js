import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, Table,
  FirstHeaderColumn, HeaderColumn,
  FirstItemColumn, ItemColumn, TrainInfo,
  EmptyTrainInfo,
  LoadingContainer
} from './styles';
import Button from '../../styles/Button';
import { PRE_PROCESSING } from '../../constants';
import { connect } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import Countdown from 'react-countdown';

class Train extends Component {

  state = {
    data: [
      { id: 1, step: "Treinamento 1/5", status: 'Finalizado', date: '02/02/2020', score: 0.88, time: '02:00' },
      { id: 2, step: "Treinamento 2/5", status: 'Finalizado', date: '02/02/2020', score: 0.90, time: '03:00' },
      { id: 3, step: "Treinamento 3/5", status: 'Finalizado', date: '02/02/2020', score: 0.92, time: '01:10' },
      { id: 4, step: "Treinamento 4/5", status: 'Finalizado', date: '02/02/2020', score: 0.87, time: '02:00' },
      { id: 5, step: "Treinamento 5/5", status: 'Progresso', date: '02/02/2020', score: null, time: null },
    ],
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
    const { train, screen } = this.props;
    const { loading } = this.props.train;
    const { data } = this.props.pre_processing;
    const isFinished = !train.loading && Object.keys(train.data).length > 0;

    return (
      <ConfigContainer size='big' style={{ color: '#000' }}>

        <BreadCrumb text='Voltar para pré-processamento' destiny={PRE_PROCESSING} />

        <Header>
          <h1>Treinamento</h1>
          <div>
            <Button disabled={!isFinished} filled={false}>Ver Métricas</Button>
            <Button disabled={!isFinished}>SALVAR MODELO</Button>
          </div>
        </Header>

        {data && data.length > 0 ?
          <TrainInfo>
            <div><b>Total de instâncias:</b> {data[0].count}</div>
            <div><b>Tempo máximo de execução (previsto):</b> {screen.data.time} minutos</div>

          </TrainInfo>
          : null}

        {screen.data.time && loading ?
          <TrainInfo>
            <div><b>Treinamento:</b> {screen.data.train}% ({this.getSplit('train')} instâncias)  | <b>Testes:</b> {screen.data.test}% ({this.getSplit('test')} instâncias)</div>
            <div><b>Tempo restante (previsto):</b> <Countdown date={Date.now() + 1000 * 60 * screen.data.time} /></div>
          </TrainInfo>
          : null}

        {loading ?
          <LoadingContainer>
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" fill="#EEEEEE" animationDuration=".5s" />
          </LoadingContainer>
          : null}

        {/* {
          train.loading ?
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
        } */}

      </ConfigContainer >
    )
  }
}

const mapStateToProps = ({ train, screen, pre_processing }) => ({ train, screen, pre_processing });

export default connect(mapStateToProps, null)(Train);