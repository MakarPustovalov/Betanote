import React, { Component } from 'react';
import './authpage.scss'
import logo from '../../Assets/img/logo.png'
import login from '../../API/login'
import { NavLink, Redirect } from 'react-router-dom'
import Input from '../Input/Input'

class LoginPage extends Component {
  constructor() {
    super()
    this.loginHandler = this.loginHandler.bind(this)
    this.loginInput = React.createRef()
    this.passwordInput = React.createRef()
  }

  loginHandler() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    login(username, password).then(data => {
      this.props.updateAuth(data.auth)
      if (!data.ok) {
        if (data.message.includes('user')) {
          this.loginInput.current.errorHandler(data.message)
        } else if (data.message.includes('Password')) {
          this.passwordInput.current.errorHandler(data.message)
        } else {
          alert(data.message)
        }
      }
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
