import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, LmsText, Table,
  FirstHeaderColumn, HeaderColumn, StatusMsgContainer,
  FirstItemColumn, ItemColumn, DetailText, RowDetail,
  LoadingContainer
} from './styles';
import Button from '../../styles/Button';
import MoreIcon from 'react-feather/dist/icons/more-horizontal';
import AlertIcon from 'react-feather/dist/icons/alert-triangle';
import TargetIcon from 'react-feather/dist/icons/crosshair';
import Progress from '../Progress';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { INDICATORS, TRAIN } from '../../constants';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { ProgressSpinner } from 'primereact/progressspinner';

class PreProcessing extends Component {

  state = {
    expandedRows: []
  };

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded ?
      currentExpandedRows.filter(name => name !== rowId) :
      currentExpandedRows.concat(rowId);

    // this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const { targetSelected } = this.props.indicator;
    const corrParsed = item.corr ? `${item.corr * 100}%` : null;
    const isTarget = targetSelected && targetSelected.value === item.name ? true : false;

    const itemRows = [
      <tr onClick={this.handleRowClick.bind(this, item.name)} key={"row-data-" + item.name}>
        <FirstItemColumn>{item.description}</FirstItemColumn>
        <ItemColumn>{item.missing ? <AlertIcon size={20} color="#FFF" fill="#A87878" /> : null}</ItemColumn>
        <ItemColumn>{isTarget ? <TargetIcon size={20} color="#DEB981" /> : null}</ItemColumn>
        <ItemColumn title={corrParsed}>{item.corr ? <Progress value={item.corr} /> : isTarget ? <b>Alvo</b> : 'N/A'}</ItemColumn>
        <ItemColumn>{item.type}</ItemColumn>
        <ItemColumn align="right">{item.unique}</ItemColumn>
        <ItemColumn align="right">{item.missing}</ItemColumn>

        <ItemColumn align="right">{item.mean}</ItemColumn>
        <ItemColumn align="right">{item.std}</ItemColumn>
        <ItemColumn align="right">{item.min}</ItemColumn>
        <ItemColumn align="right">{item.max}</ItemColumn>

        <ItemColumn style={{ display: 'flex', justifyContent: 'center' }}><MoreIcon /></ItemColumn>
      </tr >
    ];

    if (this.state.expandedRows.includes(item.name)) {
      itemRows.push(
        <RowDetail key={"row-expanded-" + item.name}>
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

          <ItemColumn colSpan={7}>
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
    const { setScreen } = this.props;
    const { data, loading, error } = this.props.indicator_metadata;

    return (
      <PerfectScrollbar style={{ width: '100%' }}>
        <ConfigContainer size='big'>

          <BreadCrumb text='Voltar para Seleção de indicadores' destiny={INDICATORS} />

          <Header>
            <h1>Pré-processamento dos dados</h1>
            <div>
              <Button onClick={setScreen.bind(this, TRAIN)}>Selecionar Modelos</Button>
            </div>
          </Header>

          <LmsText>
            <span>LMS - Moodle {data.length && !loading ? `(Total de Instâncias : ${data[0].count})` : null}</span>
          </LmsText>

          {loading ?
            <LoadingContainer>
              <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" fill="#EEEEEE" animationDuration=".5s" />
            </LoadingContainer>
            : null}

          {!data.length && !loading && !error ?
            <StatusMsgContainer> Sem dados para serem exibidos. </StatusMsgContainer>
            : null}

          {error ?
            <StatusMsgContainer>Ocorreu um erro para listar os indicadores.</StatusMsgContainer>
            : null}

          {data.length && !loading ?
            <Table>
              <thead>
                <tr>
                  <FirstHeaderColumn>Indicador</FirstHeaderColumn>
                  <HeaderColumn>&nbsp;</HeaderColumn>
                  <HeaderColumn>&nbsp;</HeaderColumn>
                  <HeaderColumn>Importância</HeaderColumn>
                  <HeaderColumn>Tipo</HeaderColumn>
                  <HeaderColumn align="right">Qtd. Único</HeaderColumn>
                  <HeaderColumn align="right">Qtd. Faltante</HeaderColumn>
                  <HeaderColumn align="right" >Média</HeaderColumn>
                  <HeaderColumn align="right">Desvio Padrão</HeaderColumn>
                  <HeaderColumn align="right">Mínimo</HeaderColumn>
                  <HeaderColumn align="right">Máximo</HeaderColumn>
                  <HeaderColumn style={{ display: 'flex', justifyContent: 'center' }}>Ações</HeaderColumn>
                </tr>
              </thead>

              <tbody>
                {data.map(item => this.renderItem(item))}
              </tbody>
            </Table>
            : null}

        </ConfigContainer >
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = ({ indicator_metadata, indicator }) => ({ indicator_metadata, indicator });

export default connect(
  mapStateToProps, { ...ScreenActions }
)(PreProcessing);