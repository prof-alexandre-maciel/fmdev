import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import {
  Header, LmsText, Table, HeaderColumn,
  StatusMsgContainer, ItemColumn,
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
import { Creators as ChartActions } from '../../store/ducks/chart';
import Chart from '../Chart';
import { Menu } from 'primereact/menu';

export const ItemColumnWrapper = onClick => ({ ...props }) => <ItemColumn onClick={onClick} {...props} />

class PreProcessing extends Component {

  state = {
    expandedRow: null,
    tableActions: [
      {
        label: 'Preencher Com:',
        items: [
          { label: 'Média', command: () => { } },
          { label: 'Mediana', command: () => { } },
          { label: 'Mais Frequente', command: () => { } },
          { label: 'Constante', command: () => { } },
        ]
      }]
  };

  handleRowClick(item) {
    const { expandedRow } = this.state;
    const { path } = this.props.pre_processing;
    const newExpandedRow = expandedRow !== item.name ? item.name : null;
    const chartType = item.type === 'Categórico' ? 'histogram' : 'box';

    if (newExpandedRow) {
      this.props.getChart({ path, indicator: item.name, chartType });
    }

    this.setState({ expandedRow: newExpandedRow });
  }

  onClickTableMenu = (itemClicked, event) => {
    let newItems = [];
    let { tableActions } = this.state;

    tableActions[0].items.forEach(item => {
      let newItem = item;

      if (itemClicked.missing) {
        newItem.disabled = true;
      }
      newItems.push(newItems);
    });

    tableActions[0].items = newItems;

    this.setState({ tableActions }, () => this.menu.toggle(event));
  }

  renderItem(item) {
    const { tableActions } = this.state;
    const { targetSelected } = this.props.indicator;
    const isTarget = targetSelected && targetSelected.value === item.name ? true : false;
    const ItemColumnWrapped = ItemColumnWrapper(this.handleRowClick.bind(this, item));

    const itemRows = [
      <tr key={"row-data-" + item.name}>
        <ItemColumnWrapped style={{ paddingLeft: '2rem' }}>{item.description}</ItemColumnWrapped>
        <ItemColumnWrapped title={item.missing ? `Qtd. Dados Faltantes: ${item.missing}` : null}>
          {item.missing ? <AlertIcon size={20} color="#FFF" fill="#A87878" /> : null}
        </ItemColumnWrapped>
        <ItemColumnWrapped>{isTarget ? <TargetIcon size={20} color="#DEB981" /> : null}</ItemColumnWrapped>
        <ItemColumnWrapped>{item.corr ? <Progress value={item.corr} /> : isTarget ? <b>Alvo</b> : 'N/A'}</ItemColumnWrapped>
        <ItemColumnWrapped>{item.type}</ItemColumnWrapped>
        <ItemColumnWrapped align="right">{item.unique}</ItemColumnWrapped>
        <ItemColumnWrapped align="right">{item.missing}</ItemColumnWrapped>

        <ItemColumnWrapped align="right">{item.mean}</ItemColumnWrapped>
        <ItemColumnWrapped align="right">{item.std}</ItemColumnWrapped>
        <ItemColumnWrapped align="right">{item.min}</ItemColumnWrapped>
        <ItemColumnWrapped align="right">{item.max}</ItemColumnWrapped>

        <Menu model={tableActions} popup={true} ref={el => this.menu = el} id="popup_menu" />
        <ItemColumn onClick={(event) => this.onClickTableMenu(item, event)} style={{ display: 'flex', justifyContent: 'center' }}><MoreIcon /></ItemColumn>
      </tr >
    ];

    if (this.state.expandedRow === item.name) {
      itemRows.push(
        <RowDetail key={"row-expanded-" + item.name}>
          <td colSpan={Object.keys(item).length}>
            <div style={{ 'display': 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Chart name={item.description} />
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
                  <HeaderColumn style={{ paddingLeft: '2rem' }}>Indicador</HeaderColumn>
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
  mapStateToProps, { ...ScreenActions, ...toastrActions, ...ChartActions }
)(PreProcessing);