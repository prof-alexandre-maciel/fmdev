import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';

class PreProcessingDialog extends Component {

  state = {
    constant: null
  };

  onClose = () => {
    this.props.setDialog('preProcessingConstant');
  }

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit = () => {

  }

  render() {
    const { constant } = this.state;
    const { preProcessingConstant, data } = this.props.dialog;

    if (!preProcessingConstant) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1>Pré-processamento</h1>

          <DialogSpan>Valor constante</DialogSpan>
          <DialogInput
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
  mapStateToProps, { ...DialogActions }
)(PreProcessingDialog);