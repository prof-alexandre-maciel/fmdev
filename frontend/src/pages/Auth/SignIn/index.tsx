import React, { Component } from 'react';
import Button from '../../../styles/Button';
import { Container, SignForm } from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as AuthActions from '../../../store/ducks/auth/actions';

interface Props {
  signInRequest(email: string, password: string): void
}

interface State {
  email?: string
  password?: string
}

class SignIn extends Component<Props, State> {

  state = {
    email: '',
    password: ''
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
        <SignForm>
          <h1>Login</h1>

          <span>E-MAIL</span>
          <input type="email" value={email} onChange={this.handleInputChange} name="email" />

          <span>SENHA</span>
          <input type="password" value={password} onChange={this.handleInputChange} name="password" />

          <Button size="big" onClick={this.handleSubmit}>Entrar</Button>

        </SignForm>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);