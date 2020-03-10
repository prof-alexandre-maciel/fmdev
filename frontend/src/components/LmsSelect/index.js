import React, { Component } from 'react';

import {
  Card, CardContainer, Image,
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan, CardVersion
} from './styles';

import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Creators as LmsActions } from '../../store/ducks/lms';
import { Creators as IndicatorActions } from '../../store/ducks/indicator';
import { actions as toastrActions } from 'react-redux-toastr';
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
  { value: '3.8.0', label: '3.8.0' },
  { value: '3.7.0', label: '3.7.0' },
  { value: '3.6.0', label: '3.6.0' }
];

class LmsSelect extends Component {

  state = {
    id: null,
    name: null,
    url: null,
    token: null,
    version: null
  }

  submit() {
    const { id, name, url, token, version } = this.state;
    const { setDialog, setScreen, putLms, getIndicators } = this.props;

    if (!url) {
      this.renderWarningMsg('Informe a URL');
      return;
    }

    if (!token) {
      this.renderWarningMsg('Informe a Chave de API');
      return;
    }

    if (!version) {
      this.renderWarningMsg('Informe a versão');
      return;
    }

    putLms({ id, url, token, version: version.value });
    setDialog(name);
    getIndicators({ lms: name });
    setScreen(INDICATORS);
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

  handleChange = (item, name) => this.setState({ [name]: item });

  renderMoodleDialog() {
    const { url, token, version } = this.state;
    const { setDialog } = this.props;

    return (
      <Dialog size="big">
        <DialogForm>
          <h1>Editar conexão</h1>

          <DialogSpan>URL</DialogSpan>
          <DialogInput value={url} autoComplete="off" onChange={this.handleChangeInput} name="url"></DialogInput>

          <DialogSpan>Chave de Api</DialogSpan>
          <DialogInput value={token} onChange={this.handleChangeInput} name="token" type="password" />

          <DialogSpan>Versão LMS</DialogSpan>
          <div style={{ width: '100%' }}>
            <Select
              isClearable
              value={version}
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

  getImgFromName = (name) => {
    if (name === MOODLE) {
      return moodle;
    }

    if (name === 'chamilo') {
      return chamilo;
    }

    if (name === 'open_edx') {
      return open_edx;
    }

    if (name === 'totara_learn') {
      return totara_learn;
    }
  }

  openDialog = (lms, item) => {
    this.setState({ ...item, version: { label: item.version, value: item.version } });
    this.props.setDialog(lms);
  }

  render() {
    const { dialog, lms } = this.props;

    return (
      <PerfectScrollbar style={{ width: '100%' }}>
        <ConfigContainer style={{ minHeight: '70%' }}>
          <h1>Escolha o LMS que você vai trabalhar</h1>

          <CardContainer>
            {lms.data.map(item => (
              <Card key={item.id} onClick={item.name === MOODLE ? this.openDialog.bind(this, item.name, item) : null}>
                <Image disabled={!item.version} alt="" src={this.getImgFromName(item.name)} />
                <CardVersion
                  disabled={!item.version}>
                  {item.version ? `Versão: ${item.version}` : 'Não Configurado'}
                </CardVersion>
              </Card>
            ))}
          </CardContainer>
        </ConfigContainer>
        {dialog.moodle ? this.renderMoodleDialog() : null}
      </PerfectScrollbar>
    );
  }
}

const mapStateToProps = ({ dialog, screen, lms }) => ({ dialog, screen, lms });

export default connect(
  mapStateToProps, {
  ...DialogActions, ...ScreenActions,
  ...LmsActions, ...toastrActions, ...IndicatorActions
}
)(LmsSelect);