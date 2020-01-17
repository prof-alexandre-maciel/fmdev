import React, { Component } from 'react';
import Button from '../../../styles/Button';
import { Container, SignForm } from '../styles';

class SignIn extends Component {

  render() {

    return (
      <Container>
        <SignForm onSubmit={() => { }}>
          <h1>Login</h1>

          <span>E-MAIL</span>
          <input type="email" name="email" />

          <span>SENHA</span>
          <input type="password" name="password" />

          <Button size="big" type="submit">Entrar</Button>

        </SignForm>
      </Container>
    )
  }
}

export default SignIn;