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
import Upload from '../Upload';
import UploadFileList from '../UploadFileList';
import api from '../../services/api';

class DataSourceDialog extends Component {

  state = {
    name: '',
    uploadedFiles: []
  };

  onClose = () => {
    this.props.setDialog('dataSource');
  }

  onCancel = () => {
    const { uploadedFiles } = this.state;

    uploadedFiles.forEach(file => this.handleDelete(file.id));

    this.props.setDialog('dataSource');
  }

  handleDelete = async id => {
    await api.delete(`file/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  submit = () => {
    const { name, uploadedFiles } = this.state;
    const fileId = uploadedFiles.map(file => file.id);

    if (!name) {
      this.renderWarningMsg('Nome não informado');
      return;
    }

    if (!uploadedFiles.length) {
      this.renderWarningMsg('Nenhum arquivo importado');
      return;
    }

    this.props.postDataSource({ name, file_id: fileId[0] });
    this.onClose();
  }

  render() {
    const { name, uploadedFiles } = this.state;
    const { dataSource } = this.props.dialog;

    if (!dataSource) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1>Adicionar Fonte de Dados</h1>

          <DialogSpan>Informe o nome da fonte de dados:</DialogSpan>
          <DialogInput
            value={name}
            autoComplete="off"
            onChange={this.handleChangeInput}
            name="name">
          </DialogInput>

          {!uploadedFiles.length && (
            <div style={{ paddingTop: '2vh' }}>
              <Upload
                onUpload={(uploadedFiles) => this.setState({ uploadedFiles })}
                accept="text/csv"
                message="Arraste um arquivo ou clique aqui."
              />
            </div>)}

          {!!uploadedFiles.length && (
            <UploadFileList
              files={uploadedFiles}
              onDelete={(uploadedFiles) => this.setState({ uploadedFiles })} />
          )}

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Salvar</Button>
            <Button color="gray" isCancel={true} onClick={this.onCancel}>Cancelar</Button>
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