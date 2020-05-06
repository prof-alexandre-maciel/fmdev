import React, { Component } from 'react';
import { Table, ItemColumn, DialogForm, DialogFormButtonContainer } from '../../styles/global';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';

class TrainAlgorithmDialog extends Component {

  onClose = () => {
    this.props.setDialog('trainAlgorithm');
  }

  renderItem = (item, idx) => (
    <tr key={idx}>
      <ItemColumn style={{ paddingLeft: '1rem' }}>{item.algorithm}</ItemColumn>
      <ItemColumn style={{ paddingLeft: '1rem' }}>{item.hyperparameters.join(', ')}</ItemColumn>
    </tr>
  )

  render() {
    const { fitted_pipelines } = this.props.train.data;
    const { trainAlgorithm } = this.props.dialog;

    if (!trainAlgorithm) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1 style={{ paddingLeft: '1rem' }}>Classificadores Utilizados</h1>

          {fitted_pipelines && fitted_pipelines.length ?
            <div style={{ display: 'flex' }}>
              <Table>
                <thead>
                  <tr>
                    <th align="left" style={{ paddingLeft: '1rem' }}>Classificador</th>
                    <th align="left" style={{ paddingLeft: '1rem' }}>Hiperparâmetros</th>
                  </tr>
                </thead>

                <tbody>
                  {fitted_pipelines.map((item, idx) => this.renderItem(item, idx))}
                </tbody>
              </Table>
            </div>
            : null}

          <DialogFormButtonContainer>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Fechar</Button>
          </DialogFormButtonContainer>


        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog, train }) => ({ dialog, train });

export default connect(
  mapStateToProps,
  {
    ...DialogActions
  }
)(TrainAlgorithmDialog);