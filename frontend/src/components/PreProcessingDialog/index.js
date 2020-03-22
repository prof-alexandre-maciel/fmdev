import React, { Component } from 'react';
// import { Container, Content } from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import { Dialog, DialogContent } from '@material-ui/core';

class PreProcessingDialog extends Component {

  onClose = () => {
    this.props.setDialog('preProcessingConstant');
  }

  render() {
    const { preProcessingConstant } = this.props.dialog;

    return (
      <Dialog
        onClose={this.onClose.bind(this)}
        open={preProcessingConstant}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ height: '55vh' }}>
          <div>Content</div>
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(
  mapStateToProps, { ...DialogActions }
)(PreProcessingDialog);