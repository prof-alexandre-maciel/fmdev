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

class PreProcessingDialog extends Component {

  state = {
    constant: null
  };

  onClose = () => {
    this.props.setDialog('preProcessingConstant');
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit = () => {
    const { onSubmit } = this.props;
    const { constant } = this.state;

    if (!constant) {
      this.renderWarningMsg('Valor da constante não informada!');
      return;
    }

    if (onSubmit) {
      this.onClose();
      onSubmit({ strategy: 'constant', constantValue: constant });
    }
  }

  getInputType = (data) => {
    let type = "text";

    if (data && data.type === 'Discreto') {
      type = "number";
    }

    return type;
  }

  render() {
    const { constant } = this.state;
    const { preProcessingConstant, data } = this.props.dialog;
    const inputType = this.getInputType(data);

    if (!preProcessingConstant) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1>Pré-processamento</h1>
          <h2>(Indicador: {data && data.description ? `${data.description})` : null}</h2>

          <DialogSpan>Constante {inputType === 'number' ? '(Apenas números)' : null}</DialogSpan>
          <DialogInput
            type={inputType}
            value={constant}
            autoComplete="off"
            onChange={this.handleChangeInput}
            name="constant">
          </DialogInput>

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Pré-processar</Button>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Cancelar</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(
  mapStateToProps, { ...DialogActions, ...toastrActions }
)(PreProcessingDialog);