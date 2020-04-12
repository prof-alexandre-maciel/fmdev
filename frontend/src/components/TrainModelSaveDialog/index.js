import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators as TrainModelActions } from '../../store/ducks/train_model';
import { ProgressSpinner } from 'primereact/progressspinner';

class TrainModelSaveDialog extends Component {

  state = {
    name: null,
    description: null
  };

  onClose = () => {
    this.props.setDialog('trainSave');
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit = () => {
    const { path } = this.props.pre_processing;
    const { name, description } = this.state;

    if (!name || !description) {
      this.renderWarningMsg('Por favor, preencha todos os campos!');
      return;
    }

    this.props.postTrainModel({
      name, description, path
    });
  }

  render() {
    const { loading } = this.props.train_model;
    const { name, description } = this.state;
    const { trainSave } = this.props.dialog;

    if (!trainSave) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1>Salvar Modelo</h1>

          <DialogSpan>Informe o nome do modelo</DialogSpan>
          <DialogInput
            value={name}
            autoComplete="off"
            onChange={this.handleChange}
            name="name">
          </DialogInput>

          <DialogSpan>Informe detalhes do modelo</DialogSpan>
          <DialogInput
            value={description}
            autoComplete="off"
            onChange={this.handleChange}
            name="description">
          </DialogInput>

          <DialogFormButtonContainer>
            {!loading ? <Button onClick={this.submit.bind(this)}>Salvar</Button> : null}
            {!loading ? <Button color="gray" isCancel={true} onClick={this.onClose}>Cancelar</Button> : null}
            {loading ? <ProgressSpinner style={{ width: '24px', height: '24px' }} strokeWidth="4" animationDuration=".5s" /> : null}
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog, train_model, pre_processing }) =>
  ({ dialog, train_model, pre_processing });

export default connect(
  mapStateToProps, { ...DialogActions, ...toastrActions, ...TrainModelActions }
)(TrainModelSaveDialog);