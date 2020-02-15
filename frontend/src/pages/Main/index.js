import React, { Component } from 'react';

import { Container } from './styles';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import SideMenu from '../../components/SideMenu';
import LmsSelect from '../../components/LmsSelect';
import Indicators from '../../components/Indicators';
import PreProcessing from '../../components/PreProcessing';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Creators as LmsActions } from '../../store/ducks/lms';
import { LMS_SELECT, INDICATORS, PRE_PROCESSING, TRAIN } from '../../constants';
import Train from '../../components/Train';

class Main extends Component {

  componentDidMount() {
    this.props.getLms();
  }

  renderContent = () => {
    const { activeScreen } = this.props.screen;

    if (activeScreen === LMS_SELECT) {
      return <LmsSelect />;
    }

    if (activeScreen === INDICATORS) {
      return <Indicators />;
    }

    if (activeScreen === PRE_PROCESSING) {
      return <PreProcessing />;
    }

    if (activeScreen === TRAIN) {
      return <Train />;
    }

    return null;
  }

  render() {
    return (
      <Container>
        <SideMenu />
        {this.renderContent()}
      </Container>
    )
  }
}

const mapStateToProps = ({ screen }) => ({ screen });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...ScreenActions, ...LmsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);