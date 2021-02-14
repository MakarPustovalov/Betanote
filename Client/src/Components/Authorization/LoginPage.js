import React, { Component } from 'react';
import './authpage.scss'
import logo from '../../Assets/img/logo.png'
import { login } from '../../API/Auth'
import { NavLink, Redirect } from 'react-router-dom'
import Input from '../Input/Input'
import { displayAlert } from '../Alert/Alert';

class LoginPage extends Component {
  constructor() {
    super()
    this.loginHandler = this.loginHandler.bind(this)
    this.loginInput = React.createRef()
    this.passwordInput = React.createRef()
  }

  async loginHandler() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if((username.length < 5) || (username.length > 30)) {
      return this.loginInput.current.errorHandler('Username length must be in range of 5-30 symbols')
    }

    if((password.length < 5) || (password.length > 30)) {
      return this.passwordInput.current.errorHandler('Password length must be in range of 5-30 symbols')
    }
    
    login(username, password).then(data => {
      if (!data.ok) {
        if (data.message.includes('user')) {
          this.loginInput.current.errorHandler(data.message)
        } else if (data.message.includes('Password')) {
          this.passwordInput.current.errorHandler(data.message)
        } else {
          displayAlert(data.message)
        }
      }
      this.props.updateAuth(data.auth)
    })
  }

  render() {
    return (
      <div className="authpage">
        {this.props.auth ? <Redirect to="/" /> : false}

        <div className="container">

          <img src={logo} alt="Betanote" className="authpage__logo"></img>

          <Input ref={this.loginInput} type="text" placeholder="Login" id="username"/>
          <Input ref={this.passwordInput} type="password" placeholder="Password" id="password"/>

          <button className="authpage__button" onClick={this.loginHandler}>Log in</button>

          <p><NavLink to="/register" className="authpage__link">Or register</NavLink></p>

        </div>
      </div>
    );
  }
}

export default LoginPage;
