import * as moment from 'moment';
import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import {
  Header, Table,
  HeaderColumn,
  ItemColumn,
  FirstHeaderColumn,
  FirstItemColumn,
  StatusMsgContainer
} from './styles';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Creators as TrainModelActions } from '../../store/ducks/train_model';

class TrainModel extends Component {

  componentDidMount() {
    this.props.getTrainModel();
  }

  renderItem = (item, idx) => (
    <tr key={idx}>
      <FirstItemColumn>{item.name}</FirstItemColumn>
      <ItemColumn>{item.description}</ItemColumn>
      <ItemColumn>{moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}</ItemColumn>
    </tr>
  )

  render() {
    const { data, loading } = this.props.train_model;

    return (
      <PerfectScrollbar style={{ width: '100%', overflowX: 'auto' }}>
        <ConfigContainer size='big' style={{ color: '#000' }}>

          <Header>
            <h1>Modelos Salvos</h1>
          </Header>


          {!data.length ?
            <StatusMsgContainer> Sem modelos salvos para serem exibidos. </StatusMsgContainer>
            : null}

          {data.length && !loading ?
            <Table>
              <thead>
                <tr>
                  <FirstHeaderColumn>Nome</FirstHeaderColumn>
                  <HeaderColumn>Descrição</HeaderColumn>
                  <HeaderColumn>Criado em</HeaderColumn>
                </tr>
              </thead>

              <tbody>
                {data.map((item, idx) => this.renderItem(item, idx))}
              </tbody>
            </Table>
            : null}

        </ConfigContainer >
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = ({ train_model }) => ({ train_model });

export default connect(mapStateToProps,
  { ...TrainModelActions })
(TrainModel);