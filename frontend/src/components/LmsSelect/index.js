import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan, CardContainer
} from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Creators as LmsActions } from '../../store/ducks/lms';
import { Creators as IndicatorActions } from '../../store/ducks/indicator';
import { actions as toastrActions } from 'react-redux-toastr';
import { connect } from 'react-redux';

import Dialog from '../Dialog';
import { default as CustomButton } from '../../styles/Button';
import { ConfigContainer } from '../../styles/ConfigContainer';
import { INDICATORS, MOODLE, ADD_TRAIN } from '../../constants';
import Select from 'react-select';
import { selectStyle, Header, fontFamily, primaryColor } from '../../styles/global';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import MonitorIcon from 'react-feather/dist/icons/monitor';
import FileIcon from 'react-feather/dist/icons/file';

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
    version: null,
    chipSelected: 'ead'
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
    setScreen(ADD_TRAIN, INDICATORS);
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
            <CustomButton style={{ width: '45%' }} filled={false} onClick={setDialog.bind(this, MOODLE, null)}>Cancelar</CustomButton>
            <CustomButton style={{ width: '45%', marginLeft: '2vw' }} onClick={this.submit.bind(this)}>Salvar</CustomButton>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }

  openDialog = (lms, item) => {
    this.setState({ ...item, version: { label: item.version, value: item.version } });
    this.props.setDialog(lms);
  }

  renderCard = (item, idx) => (
    <Card className='lms-card' key={idx}>
      <CardActionArea>
        <CardContent style={{ backgroundColor: primaryColor, color: '#FFF' }}>
          <Typography gutterBottom variant="h5" component="h2" style={{ fontFamily: fontFamily }}>
            {item.description}
          </Typography>
          <Typography variant="body3" color="textSecondary" component="p" style={{ color: '#FFF', fontFamily: fontFamily }}>
            Versão: {item.version || 'Não disponível'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" disableRipple={true} style={{ fontFamily: fontFamily, color: primaryColor, fontSize: '11px' }}>
          Configurar
        </Button>
        {item.version ?
          <Button size="small" disableRipple={true} style={{ fontFamily: fontFamily, color: primaryColor, fontSize: '11px' }}>
            Conectar
        </Button> : null}
      </CardActions>
    </Card>
  )

  setChip = (value, event) => this.setState({ chipSelected: value });

  renderDatasetOptions = () => {
    const { chipSelected } = this.state;

    return (
      <div style={{ display: 'flex', paddingLeft: '2rem' }}>
        <div>
          <Chip
            avatar={<MonitorIcon size={16} color={chipSelected === 'ead' ? '#FFF' : primaryColor} />}
            label="Ambientes EAD"
            className={chipSelected === 'ead' ? 'active-chip' : 'inactive-chip'}
            onClick={this.setChip.bind(this, 'ead')}
          />
      </div>
        <div style={{ paddingLeft: '.5vw' }}>
          <Chip
            avatar={<FileIcon size={16} color={chipSelected === 'csv' ? '#FFF' : primaryColor} />}
            label="Arquivos CSV"
            className={chipSelected === 'csv' ? 'active-chip' : 'inactive-chip'}
            onClick={this.setChip.bind(this, 'csv')}
          />
        </div>
      </div>
    )
  }

  render() {
    const { dialog, lms } = this.props;

    return (
      <PerfectScrollbar style={{ width: '100%' }}>
        <ConfigContainer style={{ minHeight: '70%' }}>

          <Header>
            <h1>Fontes de Dados</h1>
            <div>
              <CustomButton filled={false} onClick={() => { }}>Adicionar fonte de dados</CustomButton>
            </div>
          </Header>

          {this.renderDatasetOptions()}

          <CardContainer>{lms.data.map((item, idx) => this.renderCard(item, idx))}</CardContainer>
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