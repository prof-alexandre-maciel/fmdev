import React, { Component } from 'react';

import logo from '../../assets/logo.svg';
import { Container, ItemList, Item, ItemText, Logo } from './styles';
import { connect } from 'react-redux';

import { Creators as AuthActions } from '../../store/ducks/auth';
import { Creators as DialogActions } from '../../store/ducks/screen';
import { bindActionCreators } from 'redux';
import AddIcon from 'react-feather/dist/icons/plus-circle';
import TranModelIcon from 'react-feather/dist/icons/package';
import { LMS_SELECT, TRAIN_MODEL } from '../../constants';

class SideMenu extends Component {

  setScreen = (screen) => {
    this.props.setScreen(screen);
  }

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
        path: LMS_SELECT,
        icon: <AddIcon color={'#FFF'} strokeWidth={this.getStrokeWidth(LMS_SELECT)} />
      }, {
        path: TRAIN_MODEL,
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
              onClick={this.setScreen.bind(this, link.path)}>
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
  { ...AuthActions, ...DialogActions }
)(SideMenu);