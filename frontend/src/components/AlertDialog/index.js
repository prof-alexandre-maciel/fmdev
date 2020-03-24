import React, { Component } from 'react';
import { DialogForm, DialogFormButtonContainer } from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';

class AlertDialog extends Component {

  onClose = () => {
    this.props.setDialog('alert');
  }

  submit = () => {
    this.onClose();

    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  render() {
    const { alert, data } = this.props.dialog;

    if (!alert) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1>Atenção</h1>
          <h2>{data && data.description ? data.description : 'Deseja Continuar?'}</h2>

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Sim</Button>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Não</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(
  mapStateToProps, { ...DialogActions }
)(AlertDialog);