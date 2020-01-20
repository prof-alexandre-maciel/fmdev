import React, { Component } from 'react';
import Button from '../../../styles/Button';
import { Container, SignForm, } from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as AuthActions from '../../../store/ducks/auth/actions';
import logo from '../../../assets/login_logo.svg';
import squares from '../../../assets/login_squares.svg';

interface Props {
  signInRequest(email: string, password: string): void
}

interface State {
  email?: string
  password?: string
}

class SignIn extends Component<Props, State> {

  state = {
    email: 'raniel90@gmail.com',
    password: '123456'
  };

  handleInputChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);

  }

  render() {
    const { email, password } = this.state;

    return (
      <Container>
        <img alt="" src={squares} width={200} height={200} />

        <SignForm>
          <img alt="" src={logo} />
          <h1>ACESSE A PLATAFORMA</h1>

          <span>Email</span>
          <input type="email" value={email} onChange={this.handleInputChange} name="email" />

          <span>Senha</span>
          <input type="password" value={password} onChange={this.handleInputChange} name="password" />

          <Button size="big" onClick={this.handleSubmit}>Acessar o meu ambiente</Button>

        </SignForm>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);