import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConfigContainer } from '../../styles/ConfigContainer';
import BreadCrumb from '../BreadCrumb';
import { DataSourceText, RowDetail } from './styles';
import {
  Header, Table, HeaderColumn, StatusMsgContainer,
  FirstItemColumn, ItemColumn, LoadingContainer
} from '../../styles/global';
import Button from '../../styles/Button';
import MoreIcon from 'react-feather/dist/icons/more-horizontal';
import ChevronDown from 'react-feather/dist/icons/chevron-down';
import ChevronUp from 'react-feather/dist/icons/chevron-up';
import AlertIcon from 'react-feather/dist/icons/alert-triangle';
import TargetIcon from 'react-feather/dist/icons/crosshair';
import Progress from '../Progress';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { INDICATORS, TRAIN, ADD_TRAIN } from '../../constants';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators as ChartActions } from '../../store/ducks/chart';
import Chart from '../Chart';
import { Menu, MenuItem } from '@material-ui/core';
import { terciaryColor, FirstHeaderColumn } from '../../styles/global';
import PreProcessingDialog from '../PreProcessingDialog';
import TrainConfigDialog from '../TrainConfigDialog';
import { Creators as PreProcessingActions } from '../../store/ducks/pre_processing';
import { Creators as TrainActions } from '../../store/ducks/train';
import AlertDialog from '../AlertDialog';

export const ItemColumnWrapper = onClick => ({ ...props }) => <ItemColumn isClickable={true} onClick={onClick} {...props} />

class PreProcessing extends Component {

  state = {
    indicatorSelected: null,
    anchorEl: null,
    expandedRow: null
  };

  getDataSourceContext = () => this.props.indicator.datasource ? this.props.indicator.datasource.split('/')[0] : null;

  getDataSourceName = () => this.props.indicator.datasource ? this.props.indicator.datasource.split('/')[2] : null;

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

  handleMenuItemClose = () => this.setState({ anchorEl: null });

  executePreProcessing = ({ strategy, constantValue }) => {
    let newFilter = {};
    const { indicatorSelected } = this.state;
    const { filter, path } = this.props.pre_processing;

    newFilter = {
      ...filter,
      path,
      pre_processing_constant: indicatorSelected.type === 'Discreto' ? +constantValue : constantValue,
      pre_processing_strategy: strategy,
      pre_processing_indicator: indicatorSelected.name
    }

    this.props.getPreProcessing(newFilter);
  }

  handleMenuItemClick = (strategy, event) => {
    const { indicatorSelected } = this.state;

    this.handleMenuItemClose();

    if (strategy === 'constant') {
      this.props.setDialog('preProcessingConstant', indicatorSelected);
      return;
    }
    this.executePreProcessing({ strategy });
  };

  handleClickListItem = (item, event) => {
    this.setState({ anchorEl: event.currentTarget, indicatorSelected: item });
  };

  renderMenuActions = () => {
    let actions = [];
    const { anchorEl, indicatorSelected } = this.state;

    if (indicatorSelected && indicatorSelected.type === 'Discreto') {
      actions.push({ label: 'Média', pre_processing_action: 'mean' });
      actions.push({ label: 'Mediana', pre_processing_action: 'median' });
    }

    actions.push({ label: 'Valor mais frequente', pre_processing_action: 'most_frequent' });
    actions.push({ label: 'Valor constante', pre_processing_action: 'constant' });

    return (
      <Menu
        style={{ list: { paddingTop: 0, paddingBottom: 0 } }}
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleMenuItemClose}
      >
        <MenuItem style={{ color: '#FFF', backgroundColor: terciaryColor }}>Pré-processar com</MenuItem>
        {actions.map((option, index) => (
          <MenuItem
            key={index}
            selected={false}
            onClick={this.handleMenuItemClick.bind(this, option.pre_processing_action)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    )
  }

  renderIconDetail = (item) => {
    let icon = <ChevronDown size={20} />;
    const { expandedRow } = this.state;

    if (expandedRow === item.name) {
      icon = <ChevronUp size={20} />;
    }

    return <div style={{ display: 'flex', alignItems: 'center' }}>{icon}</div>
  }

  renderItem(item) {
    const { targetSelected } = this.props.indicator;
    const isTarget = targetSelected && targetSelected.value === item.name ? true : false;
    const ItemColumnWrapped = ItemColumnWrapper(this.handleRowClick.bind(this, item));

    const itemRows = [
      <tr key={"row-data-" + item.name}>
        <FirstItemColumn onClick={this.handleRowClick.bind(this, item)} isClickable={true}>{this.renderIconDetail(item)}</FirstItemColumn>
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

        <ItemColumn onClick={item.missing ? this.handleClickListItem.bind(this, item) : null} style={{ display: 'flex', justifyContent: 'center' }}>{item.missing ? <MoreIcon /> : null}</ItemColumn>
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

  goToTrain = ({ data }) => {
    const { path } = this.props.pre_processing;
    const { targetSelected } = this.props.indicator;

    const newData = {
      ...data,
      path,
      target: targetSelected && targetSelected.value ? targetSelected.value : null
    };

    this.props.postTrain(newData);
    this.props.setScreen(ADD_TRAIN, TRAIN, newData);
  };

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

    this.props.setDialog('trainConfig');
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  checkIsPreProcessed = () => {
    const { is_processed } = this.props.pre_processing;

    if (is_processed) {
      this.props.setDialog('alert', {
        description: 'Os dados pré-processados serão perdidos. Deseja continuar?'
      });
      return;
    }

    this.initPreProcessing();
  }

  initPreProcessing = () => {
    const { path } = this.props.pre_processing;

    this.props.deletePreProcessing({ path });
    this.props.setScreen(ADD_TRAIN, INDICATORS);
  }

  render() {
    const dataSourceContext = this.getDataSourceContext();
    const dataSourceName = this.getDataSourceName();
    const { data, loading, error } = this.props.pre_processing;

    return (
      <PerfectScrollbar style={{ width: '100%', overflowX: 'auto' }}>
        <ConfigContainer size='big'>

          <div onClick={this.checkIsPreProcessed.bind(this)}>
            <BreadCrumb
              text='Voltar para Seleção de indicadores'
            />
          </div>

          <Header>
            <h1>Pré-processamento dos dados</h1>
            <div>
              <Button onClick={this.submit.bind(this)}>Configurar treinamento</Button>
            </div>
          </Header>

          <DataSourceText>
            <span><b>Fonte de dados: </b> {dataSourceContext}/{dataSourceName} {data.length && !loading ? `(Total de Instâncias : ${data[0].count})` : null}</span>
          </DataSourceText>

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
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <thead>
                  <tr>
                    <FirstHeaderColumn>&nbsp;</FirstHeaderColumn>
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
                    <HeaderColumn>Ações</HeaderColumn>
                  </tr>
                </thead>

                <tbody>
                  {data.map(item => this.renderItem(item))}
                </tbody>
              </Table>
            </div>
            : null}

        </ConfigContainer>
        {this.renderMenuActions()}
        <PreProcessingDialog onSubmit={({ strategy, constantValue }) => this.executePreProcessing({ strategy, constantValue })} />
        <TrainConfigDialog onSubmit={({ data }) => this.goToTrain({ data })} />
        <AlertDialog onSubmit={this.initPreProcessing}></AlertDialog>
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = ({ pre_processing, indicator }) => ({ pre_processing, indicator });

export default connect(
  mapStateToProps, {
  ...ScreenActions, ...toastrActions,
  ...ChartActions, ...DialogActions,
  ...PreProcessingActions, ...TrainActions
}
)(PreProcessing);