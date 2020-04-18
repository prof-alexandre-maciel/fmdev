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
import { actions as toastrActions } from 'react-redux-toastr';
import { Menu, MenuItem } from '@material-ui/core';
import MoreIcon from 'react-feather/dist/icons/more-horizontal';
import CopyIcon from 'react-feather/dist/icons/copy';
import DownloadIcon from 'react-feather/dist/icons/download';
import CodeIcon from 'react-feather/dist/icons/terminal';
import TrashIcon from 'react-feather/dist/icons/trash';
import { primaryColor } from '../../styles/global';
import { BASE_URL } from '../../services/api';

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
      <ItemColumn isClicked onClick={this.handleCopyToClipboard.bind(this, idx, item)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div><CopyIcon size={16} /></div>
          <div style={{ paddingLeft: '.5vw' }}>Copiar link do modelo</div>
          <input onChange={() => { }} id={`${idx}_${item.model_id}`} value={this.getCopyURL(item)} type="tel" hidden={true} />
        </div>
      </ItemColumn>
      <ItemColumn isClicked onClick={this.handleClickListItem.bind(this, item)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MoreIcon size={16} /></div>
      </ItemColumn>
    </tr>
  )

  getCopyURL = (item) => {
    const curl = `curl --location --request GET '${BASE_URL}/predict/${item.model_id}`

    return curl;
  }

  handleMenuItemClose = () => this.setState({ anchorEl: null });

  handleClickListItem = (item, event) => {
    this.setState({ anchorEl: event.currentTarget, itemSelected: item });
  };

  handleCopyToClipboard(idx, item, event) {
    const element = document.getElementById(`${idx}_${item.model_id}`);
    console.log(element.value);

    element.select();
    element.setSelectionRange(0, 99999);

    document.execCommand("copy");

    alert("Copied the text: " + element.value);
  }

  renderMenuActions = () => {
    let actions = [
      {
        label: 'Baixar dados do modelo', icon: <DownloadIcon size={16} color={primaryColor} />
      },
      { label: 'Baixar código do modelo', icon: <CodeIcon size={16} color={primaryColor} /> },
      { label: 'Excluir modelo', icon: <TrashIcon size={16} color={primaryColor} /> }
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
            onClick={this.handleMenuItemClick.bind(this)}
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

  handleMenuItemClick = (event) => {
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
                  <HeaderColumn>&nbsp;</HeaderColumn>
                  <HeaderColumn><div style={{ display: 'flex', justifyContent: 'center' }}>Ações</div></HeaderColumn>
                </tr>
              </thead>

              <tbody>
                {data.map((item, idx) => this.renderItem(item, idx))}
              </tbody>
            </Table>
            : null}

          {this.renderMenuActions()}
        </ConfigContainer >
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = ({ train_model }) => ({ train_model });

export default connect(mapStateToProps,
  { ...TrainModelActions, ...toastrActions })
  (TrainModel);