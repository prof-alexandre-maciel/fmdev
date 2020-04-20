import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from '../../styles/global';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as LmsActions } from '../../store/ducks/lms';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { actions as toastrActions } from 'react-redux-toastr';
import Select from 'react-select';
import { selectStyle } from '../../styles/global';

const versions = [
  { value: '3.8.0', label: '3.8.0' },
  { value: '3.7.0', label: '3.7.0' },
  { value: '3.6.0', label: '3.6.0' }
];

class MoodleConfigDialog extends Component {

  onClose = () => {
    this.props.setDialog('moodle');
  }

  submit() {
    const { id, name, url, token, version } = this.props.dialog.data;

    if (!url) {
      this.renderWarningMsg('Informe a URL');
      return;
    }

    if (!token) {
      this.renderWarningMsg('Informe a Chave de API');
      return;
    }

    if (!version) {
      this.renderWarningMsg('Informe a versão');
      return;
    }

    this.props.putLms({ id, url, token, version: version.value });
    this.props.setDialog(name);
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  handleChangeInput = e => this.props.setDialogData({ [e.target.name]: e.target.value });

  handleChange = (item, name) => this.props.setDialogData({ [name]: item });

  render() {
    const { url, token, version, description } = this.props.dialog.data || {};
    const { moodle } = this.props.dialog;

    if (!moodle) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1>Configurar Integração</h1>
          <h2>{description}</h2>

          <DialogSpan>URL</DialogSpan>
          <DialogInput value={url} autoComplete="off" onChange={this.handleChangeInput} name="url"></DialogInput>

          <DialogSpan>Chave de Api</DialogSpan>
          <DialogInput value={token} onChange={this.handleChangeInput} name="token" type="password" />

          <DialogSpan>Versão LMS</DialogSpan>
          <div style={{ width: '100%' }}>
            <Select
              isClearable
              value={version}
              onChange={(e) => this.handleChange(e, 'version')}
              placeholder={'Selecione uma Versão'}
              styles={selectStyle}
              options={versions} />
          </div>

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Salvar</Button>
            <Button style={{ marginLeft: '1vw' }} color="gray" isCancel={true} onClick={this.onClose}>Cancelar</Button>
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
    ...LmsActions
  }
)(MoodleConfigDialog);