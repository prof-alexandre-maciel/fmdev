import React, { Component } from 'react';

import logo from '../../assets/logo.svg';
import { Container, ItemList, Item, ItemText, Logo } from './styles';
import { connect } from 'react-redux';

import { Creators as AuthActions } from '../../store/ducks/auth';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import AddIcon from 'react-feather/dist/icons/plus-circle';
import TranModelIcon from 'react-feather/dist/icons/package';
import MonitorIcon from 'react-feather/dist/icons/monitor';
import { DATASOURCE, TRAIN_MODEL, ADD_TRAIN, LAD } from '../../constants';

class SideMenu extends Component {

  getStrokeWidth = (screen) => {
    const { activeScreen } = this.props.screen;

    if (activeScreen === screen) {
      return 1.5;
    }

    return .5;
  }

  render() {

    const { signOutRequest } = this.props;
    const links = [
      {
        screen: LAD,
        component: LAD,
        icon: <MonitorIcon color={'#FFF'} strokeWidth={this.getStrokeWidth(LAD)} />
      },
      {
        screen: ADD_TRAIN,
        component: DATASOURCE,
        icon: <AddIcon color={'#FFF'} strokeWidth={this.getStrokeWidth(ADD_TRAIN)} />
      },
      {
        screen: TRAIN_MODEL,
        component: TRAIN_MODEL,
        icon: <TranModelIcon color={'#FFF'} strokeWidth={this.getStrokeWidth(TRAIN_MODEL)} />
      }
    ];

    return (
      <Container>
        <ItemList>
          <Logo>
            <img alt="" src={logo} />
          </Logo>
          {links.map((link, idx) => (
            <Item
              key={idx}
              onClick={this.props.setScreen.bind(this, link.screen, link.component, null)}>
              {link.icon}
            </Item>
          ))}
        </ItemList>
        <ItemList>
          <Item>
            <ItemText onClick={signOutRequest}>Sair</ItemText>
          </Item>
        </ItemList>
      </Container>
    );
  }
}

const mapStateToProps = ({ screen }) => ({ screen });

export default connect(
  mapStateToProps,
  { ...AuthActions, ...ScreenActions }
)(SideMenu);