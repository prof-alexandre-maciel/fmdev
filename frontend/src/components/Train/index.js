import * as moment from 'moment';
import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, Table,
  FirstHeaderColumn, HeaderColumn,
  FirstItemColumn, ItemColumn, TrainInfo,
  StatusMsgContainer
} from './styles';
import Button from '../../styles/Button';
import { PRE_PROCESSING } from '../../constants';
import { connect } from 'react-redux';
import Countdown from 'react-countdown';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CheckIcon from 'react-feather/dist/icons/check';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Creators as TrainStatusActions } from '../../store/ducks/train_status';
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Beforeunload } from 'react-beforeunload';

class Train extends Component {

  state = {
    interval: null,
    countdown: Date.now()
  };

  componentDidMount() {
    const interval = window.setInterval(this.callTrainStatus, 1000 * 60);

    this.setState({
      countdown: Date.now(),
      interval
    });
  }

  callTrainStatus = () => {
    const { path } = this.props.pre_processing;
    this.props.postTrainStatus({ path });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  renderItem(item) {
    const itemRows = [
      <tr key={"row-data-" + item.id}>
        <FirstItemColumn>{this.getStatusIcon(item)}</FirstItemColumn>
        <ItemColumn>{item.step}</ItemColumn>
        <ItemColumn>{item.status}</ItemColumn>
        <ItemColumn>{item.date ? moment(item.date).format('DD/MM/YYYY HH:mm:ss') : null}</ItemColumn>
        <ItemColumn>{item.score}</ItemColumn>
      </tr>
    ];

    return itemRows;
  }

  getStatusIcon = (item) => {
    if (item.status === 'Em andamento') {
      return (
        <ProgressSpinner
          style={{ width: '24px', height: '24px' }}
          strokeWidth="4"
          animationDuration=".5s" />
      )
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CheckIcon color={'#12BB6A'} />
      </div>
    );
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  getSplit = (value) => {
    const { data } = this.props.pre_processing;

    return ~~((data[0].count * this.props.screen.data[value]) / 100);
  }

  checkGoBackToPreProcessing = () => {
    const { loading } = this.props.train;

    if (loading) {
      this.renderWarningMsg('Não é possível voltar para a tela de pré-processamento durante o treinamento!');
      return;
    }

    this.props.setScreen(PRE_PROCESSING);
  }


  render() {
    const { countdown } = this.state;
    const { train, screen, train_status } = this.props;
    const { loading, error } = this.props.train;
    const { data } = this.props.pre_processing;
    const isFinished = !train.loading && Object.keys(train.data).length > 0;

    return (
      <Beforeunload onBeforeunload={() => "Deseja Continuar?"}>
        <PerfectScrollbar style={{ width: '100%', overflowX: 'auto' }}>
          <ConfigContainer size='big' style={{ color: '#000' }}>

            <div onClick={this.checkGoBackToPreProcessing}>
              <BreadCrumb
                text='Voltar para pré-processamento'
              />
            </div>

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

            {screen.data.time ?
              <TrainInfo>
                <div><b>Treinamento:</b> {screen.data.train}% ({this.getSplit('train')} instâncias)  | <b>Testes:</b> {screen.data.test}% ({this.getSplit('test')} instâncias)</div>
                <div><b>Tempo restante (previsto):</b>{loading ? <Countdown date={countdown + 1000 * 60 * screen.data.time} /> : 'N/A'}</div>
              </TrainInfo>
              : null}


            {!loading && !error && !train_status.data.length ?
              <StatusMsgContainer> Sem dados de treinamento para serem exibidos. </StatusMsgContainer>
              : null}

            <Table>
              <thead>
                <tr>
                  <FirstHeaderColumn>&nbsp;</FirstHeaderColumn>
                  <HeaderColumn>Etapa</HeaderColumn>
                  <HeaderColumn>Status</HeaderColumn>
                  <HeaderColumn>Finalizado em</HeaderColumn>
                  <HeaderColumn>Score</HeaderColumn>
                </tr>
              </thead>

              <tbody>
                {train_status.data.map(item => this.renderItem(item))}
                {loading ? this.renderItem({
                  step: `Treinamento ${train_status.data.length + 1}`,
                  status: 'Em andamento',
                  date: null,
                  score: null
                })
                  : null}
              </tbody>
            </Table>

          </ConfigContainer >
        </PerfectScrollbar>
      </Beforeunload>
    )
  }
}

const mapStateToProps = ({ train, screen, pre_processing, train_status }) =>
  ({ train, screen, pre_processing, train_status });

export default connect(mapStateToProps,
  { ...TrainStatusActions, ...toastrActions, ...ScreenActions }
)(Train);