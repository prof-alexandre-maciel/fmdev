import React, { Component } from 'react';
import { CardContainer } from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as LmsActions } from '../../store/ducks/lms';
import { connect } from 'react-redux';
import { default as CustomButton } from '../../styles/Button';
import { ConfigContainer } from '../../styles/ConfigContainer';
import { Header, fontFamily, primaryColor } from '../../styles/global';
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
import MoodleConfigDialog from '../MoodleConfigDialog';
import { INDICATORS, ADD_TRAIN } from '../../constants';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Creators as IndicatorActions } from '../../store/ducks/indicator';

const availableLms = { moodle: true };

class LmsSelect extends Component {

  state = {
    chipSelected: 'ead'
  }

  openDialogConfig = (item, event) => {
    if (!availableLms[item.name]) return;

    this.props.setDialog(item.name, {
      ...item,
      version: {
        label: item.version, value: item.version
      }
    })
  }

  renderCard = (item, idx) => (
    <Card className='lms-card' key={idx} style={{ opacity: availableLms[item.name] ? 1 : .3 }}>
      <CardActionArea>
        <CardContent style={{ backgroundColor: primaryColor, color: '#FFF' }}>
          <Typography gutterBottom variant="h5" component="h2" style={{ fontFamily: fontFamily }}>
            {item.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{ color: '#FFF', fontFamily: fontFamily, fontSize: '11px' }}>
            Versão: {item.version ? item.version : 'Não disponível'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={this.openDialogConfig.bind(this, item)}
          size="small" disableRipple={true} style={{ fontFamily: fontFamily, color: primaryColor, fontSize: '11px' }}>
          Configurar
        </Button>
        <Button onClick={this.goToIndicators.bind(this, item)} size="small" disableRipple={true} style={{ fontFamily: fontFamily, color: primaryColor, fontSize: '11px' }}>
          utilizar esta fonte
        </Button>
      </CardActions>
    </Card>
  )

  goToIndicators = (item, event) => {
    if (!availableLms[item.name]) return;

    this.props.setScreen(ADD_TRAIN, INDICATORS);
    this.props.getIndicators({ lms: item.name });
  }

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
    const { lms } = this.props;

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
        <MoodleConfigDialog />
      </PerfectScrollbar>
    );
  }
}

const mapStateToProps = ({ lms }) => ({ lms });

export default connect(
  mapStateToProps, {
  ...DialogActions, ...LmsActions,
  ...ScreenActions, ...IndicatorActions
}
)(LmsSelect);