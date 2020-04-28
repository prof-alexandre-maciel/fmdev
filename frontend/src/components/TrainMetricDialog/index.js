import React, { Component } from 'react';
import { DialogForm, DialogFormButtonContainer } from './styles';
import { Table, ItemColumn } from '../../styles/global';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators as TrainModelActions } from '../../store/ducks/train_model';
import { ProgressSpinner } from 'primereact/progressspinner';

class TrainMetricDialog extends Component {

  onClose = () => {
    this.props.setDialog('trainMetrics');
  }

  renderItem = (item, idx) => (
    <tr key={idx}>
      <ItemColumn style={{ paddingLeft: '1rem' }}><b>{item.name}</b></ItemColumn>
      <ItemColumn>{item.value.toFixed(2)}</ItemColumn>
    </tr>
  )

  render() {
    const { data, loading } = this.props.train_metric;
    const { trainMetrics } = this.props.dialog;

    if (!trainMetrics) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1 style={{ paddingLeft: '1rem' }}>Métricas</h1>

          {loading ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '15vh' }}>
              <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" animationDuration=".5s" />
            </div>
            : null}

          {data && !loading ?
            <Table>
              <tbody>
                {data.map((item, idx) => this.renderItem(item, idx))}
              </tbody>
            </Table>
            : null}

          {!loading ? <DialogFormButtonContainer>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Fechar</Button>
          </DialogFormButtonContainer> : null}


        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog, train_metric, pre_processing }) =>
  ({ dialog, train_metric, pre_processing });

export default connect(
  mapStateToProps,
  {
    ...DialogActions, ...toastrActions,
    ...TrainModelActions
  }
)(TrainMetricDialog);