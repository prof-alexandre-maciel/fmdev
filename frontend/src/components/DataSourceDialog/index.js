import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as DataSourceActions } from '../../store/ducks/data_source';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { actions as toastrActions } from 'react-redux-toastr';

class DataSourceDialog extends Component {

  state = {
    name: null
  };

  onClose = () => {
    this.props.setDialog('dataSource');
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  handleChangeInput = e => this.props.setDialogData({ [e.target.name]: e.target.value });

  submit = () => {
    const { name } = this.state;

    if (!name) {
      this.renderWarningMsg('Nome não informado');
      return;
    }

    this.props.postDataSource({ name });
    this.onClose();
  }

  render() {
    const { name } = this.props.dialog.data || {};
    const { dataSource, data } = this.props.dialog;

    if (!dataSource) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          {!data || data.id ? <h1>Adicionar Fonte de Dados</h1> : null}
          {data && data.id ? <h1>Editar Fonte de Dados</h1> : null}

          <DialogSpan>Informe o nome</DialogSpan>
          <DialogInput
            value={name}
            autoComplete="off"
            onChange={this.handleChangeInput}
            name="name">
          </DialogInput>

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Salvar</Button>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Cancelar</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(
  mapStateToProps,
  {
    ...DialogActions, ...toastrActions,
    ...DataSourceActions
  }
)(DataSourceDialog);