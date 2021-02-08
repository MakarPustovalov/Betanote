import React, { Component } from 'react';
import './authpage.scss'
import logo from '../../Assets/img/logo.png'
import login from '../../API/login'
import { NavLink, Redirect } from 'react-router-dom'

class LoginPage extends Component {
  constructor() {
    super()
    this.loginHandler = this.loginHandler.bind(this)
  }

  loginHandler() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    login(username, password).then(data => this.props.updateAuth(data.auth))
  }

  render() {
    return (
      <div className="authpage">
        {this.props.auth ? <Redirect to="/" /> : false}

        <div className="container">

          <img src={logo} alt="Betanote" className="authpage__logo"></img>

          <input type="text" placeholder="Login" id="username" className="authpage__input"/>
          <input type="password" placeholder="Password" id="password" className="authpage__input"/>

          <button className="authpage__button" onClick={this.loginHandler}>Log in</button>

          <NavLink to="/register" className="authpage__link">Or register</NavLink>

        </div>
      </div>
    );
  }
}

export default LoginPage;
