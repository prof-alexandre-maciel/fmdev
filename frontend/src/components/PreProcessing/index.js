import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, LmsText, Table,
  FirstHeaderColumn, HeaderColumn,
  StatusMsgContainer, FirstItemColumn, ItemColumn,
  RowDetail, LoadingContainer
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
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators as BoxPlotActions } from '../../store/ducks/box_plot';
import BoxPlot from '../BoxPlot';

class PreProcessing extends Component {

  state = {
    expandedRow: null
  };

  handleRowClick(item) {
    const { expandedRow } = this.state;
    const { path } = this.props.pre_processing;
    const newExpandedRow = expandedRow !== item.name ? item.name : null;

    if (newExpandedRow) {
      if (item.type === 'Categórico') {
        this.props.boxPlotInit();
      } else {
        this.props.getBoxPlot({ path, indicator: item.name });
      }
    }

    this.setState({ expandedRow: newExpandedRow });
  }

  renderItem(item) {
    const { targetSelected } = this.props.indicator;
    const isTarget = targetSelected && targetSelected.value === item.name ? true : false;

    const itemRows = [
      <tr onClick={this.handleRowClick.bind(this, item)} key={"row-data-" + item.name}>
        <FirstItemColumn>{item.description}</FirstItemColumn>
        <ItemColumn title={item.missing ? `Qtd. Dados Faltantes: ${item.missing}` : null}>
          {item.missing ? <AlertIcon size={20} color="#FFF" fill="#A87878" /> : null}
        </ItemColumn>
        <ItemColumn>{isTarget ? <TargetIcon size={20} color="#DEB981" /> : null}</ItemColumn>
        <ItemColumn>{item.corr ? <Progress value={item.corr} /> : isTarget ? <b>Alvo</b> : 'N/A'}</ItemColumn>
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

    if (this.state.expandedRow === item.name) {
      itemRows.push(
        <RowDetail key={"row-expanded-" + item.name}>
          <td colSpan={Object.keys(item).length}>
            <div style={{ 'display': 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BoxPlot name={item.description} />
            </div>
          </td>
        </RowDetail>
      );
    }

    return itemRows;
  }

  submit = () => {
    const { data } = this.props.pre_processing;
    const itemsMissing = data.filter(item => item.missing);

    if (itemsMissing.length) {
      this.renderWarningMsg('Por favor, verifique as pendências antes de continuar.');
      return;
    }

    if (!data.length) {
      this.renderWarningMsg('Sem dados disponíveis.');
      return;
    }

    this.props.setScreen(TRAIN);
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  render() {
    const { data, loading, error } = this.props.pre_processing;

    return (
      <PerfectScrollbar style={{ width: '100%' }}>
        <ConfigContainer size='big'>

          <BreadCrumb text='Voltar para Seleção de indicadores' destiny={INDICATORS} />

          <Header>
            <h1>Pré-processamento dos dados</h1>
            <div>
              <Button onClick={this.submit.bind(this)}>Selecionar Modelos</Button>
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

          {data.length && !loading && !error ?
            <Table>
              <thead>
                <tr>
                  <FirstHeaderColumn>Indicador</FirstHeaderColumn>
                  <HeaderColumn>&nbsp;</HeaderColumn>
                  <HeaderColumn>&nbsp;</HeaderColumn>
                  <HeaderColumn>Correlação</HeaderColumn>
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

const mapStateToProps = ({ pre_processing, indicator }) => ({ pre_processing, indicator });

export default connect(
  mapStateToProps, { ...ScreenActions, ...toastrActions, ...BoxPlotActions }
)(PreProcessing);