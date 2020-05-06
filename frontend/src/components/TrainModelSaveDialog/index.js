import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from '../../styles/global';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators as TrainModelActions } from '../../store/ducks/train_model';
import { ProgressSpinner } from 'primereact/progressspinner';

class TrainModelSaveDialog extends Component {

  state = {
    name: '',
    description: ''
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
    const { score } = this.props.train.data;
    const { name, description } = this.state;

    if (!name || !description) {
      this.renderWarningMsg('Por favor, preencha todos os campos!');
      return;
    }

    this.props.postTrainModel({
      name, 
      description, 
      path, 
      score: score || null
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
          <h1>{loading ? 'Salvando Modelo...' : 'Salvar Modelo'}</h1>

          {loading ? 
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '15vh' }}>
              <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" animationDuration=".5s" />
            </div>
          : null}

          {!loading ? <DialogSpan>Nome do modelo</DialogSpan> : null}
          {!loading ? <DialogInput
            value={name}
            autoComplete="off"
            onChange={this.handleChange}
            name="name">
          </DialogInput> : null}

          {!loading ? <DialogSpan>Detalhes do modelo</DialogSpan> : null}
          {!loading ? <DialogInput
            value={description}
            autoComplete="off"
            onChange={this.handleChange}
            name="description">
          </DialogInput> : null}

          {!loading ? <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Salvar</Button>
            <Button style={{ marginLeft: '1vw' }} color="gray" isCancel={true} onClick={this.onClose}>Cancelar</Button>
          </DialogFormButtonContainer> : null}


        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog, train_model, pre_processing, train }) =>
  ({ dialog, train_model, pre_processing, train });

export default connect(
  mapStateToProps, { ...DialogActions, ...toastrActions, ...TrainModelActions }
)(TrainModelSaveDialog);