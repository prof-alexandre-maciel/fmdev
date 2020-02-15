import React, { Component, Fragment } from 'react';

import {
  Card, CardContainer, Image,
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from './styles';

import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { connect } from 'react-redux';

import moodle from '../../assets/moodle.svg';
import chamilo from '../../assets/chamilo.svg';
import open_edx from '../../assets/open_edx.svg';
import totara_learn from '../../assets/totara_learn.svg';

import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { ConfigContainer } from '../../styles/ConfigContainer';
import { INDICATORS, MOODLE } from '../../constants';
import Select from 'react-select';
import { selectStyle } from '../../styles/global';
import PerfectScrollbar from 'react-perfect-scrollbar';

const moodleOptions = [
  { value: '3.8', label: '3.8' },
  { value: '3.7', label: '3.7' },
  { value: '3.6', label: '3.6' }
];

class LmsSelect extends Component {

  state = {
    url: null,
    api_key: null,
    version: null
  }

  submit() {
    const { setDialog, setScreen } = this.props;

    setDialog(MOODLE);
    setScreen(INDICATORS);
  }

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = (item, name) => this.setState({ [name]: item });

  renderMoodleDialog() {
    const { setDialog } = this.props;

    return (
      <Dialog size="big">
        <DialogForm>
          <h1>Criar conexão</h1>

          <DialogSpan>URL</DialogSpan>
          <DialogInput autoComplete="off" onChange={this.handleChangeInput} name="url"></DialogInput>

          <DialogSpan>Chave de Api</DialogSpan>
          <DialogInput onChange={this.handleChangeInput} name="api_key" />

          <DialogSpan>Versão LMS</DialogSpan>
          <div style={{ width: '100%' }}>
            <Select
              isClearable
              value={this.state.version}
              onChange={(e) => this.handleChange(e, 'version')}
              placeholder={'Selecione uma Versão'}
              styles={selectStyle}
              options={moodleOptions} />
          </div>

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Salvar</Button>
            <Button color="gray" isCancel={true} onClick={setDialog.bind(this, MOODLE)}>Cancelar</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }

  render() {
    const { dialog, setDialog } = this.props;

    return (
      <PerfectScrollbar style={{ width: '100%' }}>
        <ConfigContainer>
          <h1>Escolha o LMS que você vai trabalhar</h1>
          <CardContainer>
            <Card onClick={setDialog.bind(this, MOODLE)}>
              <Image alt="" src={moodle} />
              <span>Versão: 3.8.0</span>
            </Card>
            <Card>
              <Image alt="" disabled src={chamilo} />
              <span>Versão: 2.5.0</span>
            </Card>
            <Card>
              <Image alt="" disabled src={open_edx} />
              <span>Versão: 1.0.1</span>
            </Card>
            <Card>
              <Image alt="" disabled src={totara_learn} />
              <span>Versão: 2.5.3</span>
            </Card>
          </CardContainer>
        </ConfigContainer>
        {dialog.moodle ? this.renderMoodleDialog() : null}
      </PerfectScrollbar>
    );
  }
}

const mapStateToProps = ({ dialog, screen }) => ({ dialog, screen });

export default connect(
  mapStateToProps, {
  ...DialogActions, ...ScreenActions
}
)(LmsSelect);