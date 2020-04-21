import React, { Component } from 'react';
import { CardContainer } from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as LmsActions } from '../../store/ducks/lms';
import { Creators as DataSourceActions } from '../../store/ducks/data_source';
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
import Chip from '@material-ui/core/Chip';
import MonitorIcon from 'react-feather/dist/icons/monitor';
import EditIcon from 'react-feather/dist/icons/settings';
import DeleteIcon from 'react-feather/dist/icons/trash-2';
import PlayIcon from 'react-feather/dist/icons/play';
import FileIcon from 'react-feather/dist/icons/file';
import MoodleConfigDialog from '../MoodleConfigDialog';
import { INDICATORS, ADD_TRAIN } from '../../constants';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Creators as IndicatorActions } from '../../store/ducks/indicator';
import DataSourceDialog from '../DataSourceDialog';
import * as moment from 'moment';
import IconButton from '@material-ui/core/IconButton';

const availableLms = { moodle: true };

class DataSource extends Component {

  state = {
    chipSelected: 'csv'
  }

  componentWillMount() {
    this.props.getDataSource();
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

  renderCardLMS = (item, idx) => (
    <Card className='lms-card' key={idx} style={{ opacity: availableLms[item.name] ? 1 : .3 }}>
      <CardActionArea>
        <CardContent style={{ color: primaryColor }}>
          <Typography gutterBottom variant="h5" component="h2" style={{ fontFamily: fontFamily }}>
            {item.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{ color: primaryColor, fontFamily: fontFamily, fontSize: '10px' }}>
            Versão: {item.version ? item.version : 'Não disponível'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ backgroundColor: primaryColor }}>
        <IconButton onClick={this.openDialogConfig.bind(this, item)}>
          <EditIcon size={20} color={'#FFF'} />
        </IconButton>

        <IconButton onClick={this.goToIndicators.bind(this, item)}>
          <PlayIcon size={20} color={'#FFF'} />
        </IconButton>
      </CardActions>
    </Card>
  )

  renderCardCSV = (item, idx) => (
    <Card className='lms-card' key={idx}>
      <CardActionArea>
        <CardContent style={{ color: primaryColor }}>
          <Typography gutterBottom variant="h5" component="h2" style={{ fontFamily: fontFamily }}>
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{ color: primaryColor, fontFamily: fontFamily, fontSize: '10px' }}>
            Criado em: {moment(item.created_at).format('DD/MM/YYYY HH:mm')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ backgroundColor: primaryColor }}>
        <IconButton onClick={this.goToIndicators.bind(this, item)}>
          <PlayIcon size={20} color={'#FFF'} />
        </IconButton>
        <IconButton>
          <DeleteIcon size={20} color={'#FFF'} />
        </IconButton>
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
            avatar={<MonitorIcon size={16} color={chipSelected === 'lms' ? '#FFF' : primaryColor} />}
            label="Ambientes EAD"
            className={chipSelected === 'lms' ? 'active-chip' : 'inactive-chip'}
            onClick={this.setChip.bind(this, 'lms')}
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

  addDataSource = () => this.props.setDialog('dataSource');

  render() {
    const { chipSelected } = this.state;
    const { lms, data_source } = this.props;

    return (
      <PerfectScrollbar style={{ width: '100%' }}>
        <ConfigContainer style={{ minHeight: '70%' }}>

          <Header>
            <h1>Fontes de Dados</h1>
            <div>
              <CustomButton filled={false} onClick={this.addDataSource}>Adicionar fonte de dados</CustomButton>
            </div>
          </Header>

          {this.renderDatasetOptions()}

          {chipSelected === 'lms' ?
            <CardContainer>{lms.data.map((item, idx) => this.renderCardLMS(item, idx))}</CardContainer>
            : null}

          {chipSelected === 'csv' ?
            <CardContainer>{data_source.data.map((item, idx) => this.renderCardCSV(item, idx))}</CardContainer>
            : null}
        </ConfigContainer>
        <MoodleConfigDialog />
        <DataSourceDialog />
      </PerfectScrollbar>
    );
  }
}

const mapStateToProps = ({ lms, data_source }) => ({ lms, data_source });

export default connect(
  mapStateToProps, {
  ...DialogActions, ...LmsActions,
  ...ScreenActions, ...IndicatorActions,
  ...DataSourceActions
}
)(DataSource);