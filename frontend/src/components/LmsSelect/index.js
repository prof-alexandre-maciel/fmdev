import React, { Component, Fragment } from 'react';

import { Container, Card, CardContainer, Image, ModalForm } from './styles';

import * as WorkflowActions from '../../store/ducks/workflow/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moodle from '../../assets/moodle.svg';
import chamilo from '../../assets/chamilo.svg';
import open_edx from '../../assets/open_edx.svg';
import totara_learn from '../../assets/totara_learn.svg';

import Modal from '../../components/Modal';
import Button from '../../styles/Button';

class LmsSelect extends Component {

  state = {
    url: null,
    api_key: null
  }

  submit() {
    const { closeLmsModal } = this.props;
    // const { lms } = this.props.workflow;

    closeLmsModal();
  }

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderModal() {
    const { closeLmsModal } = this.props;

    return (
      <Modal size="big">
        <ModalForm>
          <h1>Criar conexão</h1>

          <span>URL</span>
          <input onChange={this.handleChangeInput} name="url" />

          <span>Chave de Api</span>
          <input nChange={this.handleChangeInput} name="api_key" />

          <Button onClick={this.submit.bind(this)}>Salvar</Button>
          <Button size="small" color="gray" onClick={closeLmsModal}>Cancelar</Button>
        </ModalForm>
      </Modal>
    )
  }

  render() {
    const { workflow, openLmsModal } = this.props;

    return (
      <Fragment>
        <Container>
          <h1>Escolha o LMS que você vai trabalhar</h1>
          <CardContainer>
            <Card onClick={openLmsModal.bind(this, 'moodle')}>
              <Image alt="" src={moodle} />
              <span>Última versão: 7.0.1</span>
            </Card>
            <Card>
              <Image alt="" disabled src={chamilo} />
              <span>Última versão: 7.0.1</span>
            </Card>
            <Card>
              <Image alt="" disabled src={open_edx} />
              <span>Última versão: 7.0.1</span>
            </Card>
            <Card>
              <Image alt="" disabled src={totara_learn} />
              <span>Última versão: 7.0.1</span>
            </Card>
          </CardContainer>
        </Container>
        {workflow.openLmsModal ? this.renderModal() : null}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ workflow }) => ({ workflow });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(WorkflowActions, dispatch);

export default connect(
  mapStateToProps, mapDispatchToProps
)(LmsSelect);