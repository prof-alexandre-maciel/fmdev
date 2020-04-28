import * as moment from 'moment';
import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import {
  Header, Table, HeaderColumn, ItemColumn,
  FirstHeaderColumn, FirstItemColumn,
  StatusMsgContainer, LoadingContainer
} from '../../styles/global';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Creators as TrainModelActions } from '../../store/ducks/train_model';
import { Creators as ModelCopyActions } from '../../store/ducks/model_copy';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as DownloadActions } from '../../store/ducks/download';
import { actions as toastrActions } from 'react-redux-toastr';
import { Menu, MenuItem } from '@material-ui/core';
import MoreIcon from 'react-feather/dist/icons/more-horizontal';
import CopyIcon from 'react-feather/dist/icons/copy';
import KeyIcon from 'react-feather/dist/icons/key';
import DownloadIcon from 'react-feather/dist/icons/download';
import CodeIcon from 'react-feather/dist/icons/terminal';
import TrashIcon from 'react-feather/dist/icons/trash';
import { primaryColor } from '../../styles/global';
import { PRE_PROCESSING_RAW, TRAIN_PIPELINES } from '../../constants';
import AlertDialog from '../../components/AlertDialog';
import { ProgressSpinner } from 'primereact/progressspinner';

class TrainModel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemSelected: null,
      anchorEl: null
    };
  }

  componentDidMount() {
    this.props.getTrainModel();
  }

  renderItem = (item, idx) => (
    <tr key={idx}>
      <FirstItemColumn>{item.name}</FirstItemColumn>
      <ItemColumn>{item.description}</ItemColumn>
      <ItemColumn>{moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}</ItemColumn>
      <ItemColumn>{item.score ? item.score.toFixed(2) : null}</ItemColumn>
      <ItemColumn>{item.last_predict_at ? moment(item.last_predict_at).format('DD/MM/YYYY HH:mm:ss') : null}</ItemColumn>
      <ItemColumn>{item.qtd_predict ? item.qtd_predict : 0}</ItemColumn>
      <ItemColumn isClickable onClick={this.handleClickMenu.bind(this, item)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MoreIcon size={16} /></div>
      </ItemColumn>
    </tr>
  )

  handleMenuItemClose = () => this.setState({ anchorEl: null });

  handleClickMenu = (item, event) => {
    this.setState({ anchorEl: event.currentTarget, itemSelected: item });
  };

  deleteModel = () => {
    const { itemSelected } = this.state;

    this.props.deleteTrainModel(itemSelected.model_id);
  }

  renderMenuActions = () => {
    let actions = [
      {
        action: 'download_data',
        label: 'Baixar dados do modelo',
        icon: <DownloadIcon size={16} color={primaryColor} />
      },
      {
        action: 'download_pipeline',
        label: 'Baixar código do modelo',
        icon: <CodeIcon size={16} color={primaryColor} />
      },
      {
        action: 'copy_url',
        label: 'Copiar URL do modelo',
        icon: <CopyIcon size={16} color={primaryColor} />
      },
      {
        action: 'generate_key',
        label: 'Gerar nova chave de API',
        icon: <KeyIcon size={16} color={primaryColor} />
      },
      {
        action: 'delete_model',
        label: 'Excluir modelo',
        icon: <TrashIcon size={16} color={primaryColor} />
      }
    ];

    const { anchorEl } = this.state;

    return (
      <Menu
        style={{ list: { paddingTop: 0, paddingBottom: 0 } }}
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleMenuItemClose}
      >
        {actions.map((option, index) => (
          <MenuItem
            style={{ color: primaryColor, fontSize: '14px' }}
            key={index}
            selected={false}
            onClick={this.handleMenuItemClick.bind(this, option)}
          >
            {option.icon}&nbsp;&nbsp;{option.label}
          </MenuItem>
        ))}
      </Menu>
    )
  }

  renderSuccessMsg = ({ title, message }) => {
    this.props.add({
      type: 'success',
      title: title || 'Sucesso',
      message
    });
  }

  handleMenuItemClick = (option, event) => {
    const { model_id } = this.state.itemSelected;

    if (option.action === 'download_data') {
      this.props.getDownload(model_id, PRE_PROCESSING_RAW);
    }

    if (option.action === 'download_pipeline') {
      this.props.getDownload(model_id, TRAIN_PIPELINES);
    }

    if (option.action === 'delete_model') {
      this.props.setDialog('alert', {
        description: 'Todos os dados gerados pelo modelo serão removidos. Deseja continuar?'
      });
    }

    if (option.action === 'copy_url') {
      this.props.getModelCopy(model_id)
    }

    if (option.action === 'generate_key') {
      this.props.putTrainModel(model_id, { data: {}, action: 'GENERATE_KEY' });
    }

    this.handleMenuItemClose();
  };

  render() {
    const { data, loading } = this.props.train_model;

    return (
      <PerfectScrollbar style={{ width: '100%', overflowX: 'auto' }}>
        <ConfigContainer size='big' style={{ color: '#000' }}>

          <Header>
            <h1>Modelos Salvos</h1>
          </Header>


          {!data.length && !loading ?
            <StatusMsgContainer> Sem modelos salvos para serem exibidos. </StatusMsgContainer>
            : null}

          {loading ?
            <LoadingContainer>
              <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" fill="#EEEEEE" animationDuration=".5s" />
            </LoadingContainer>
            : null}

          {data.length && !loading ?
            <Table>
              <thead>
                <tr>
                  <FirstHeaderColumn>Nome</FirstHeaderColumn>
                  <HeaderColumn>Descrição</HeaderColumn>
                  <HeaderColumn>Criado em</HeaderColumn>
                  <HeaderColumn>Acurácia de teste</HeaderColumn>
                  <HeaderColumn>Última predição em</HeaderColumn>
                  <HeaderColumn>Predições realizadas</HeaderColumn>
                  <HeaderColumn><div style={{ display: 'flex', justifyContent: 'center' }}>Ações</div></HeaderColumn>
                </tr>
              </thead>

              <tbody>
                {data.map((item, idx) => this.renderItem(item, idx))}
              </tbody>
            </Table>
            : null}

          {this.renderMenuActions()}
          <AlertDialog onSubmit={this.deleteModel}></AlertDialog>
        </ConfigContainer >
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = ({ train_model }) => ({ train_model });

export default connect(mapStateToProps,
  {
    ...TrainModelActions, ...toastrActions,
    ...ModelCopyActions, ...DownloadActions,
    ...DialogActions
  })
  (TrainModel);