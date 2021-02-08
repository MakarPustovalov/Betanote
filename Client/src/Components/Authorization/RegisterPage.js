import React, { Component } from 'react';
import './authpage.scss'
import logo from '../../Assets/img/logo.png'
import register from '../../API/register'
import { NavLink, Redirect } from 'react-router-dom'

class RegisterPage extends Component {
  constructor() {
    super()
    this.registerHandler = this.registerHandler.bind(this)
  }

  registerHandler() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    register(username, password).then(data => this.props.updateAuth(data.auth))
  }

  render() {
    return (
      <div className="authpage">
        {this.props.auth ? <Redirect to="/" /> : false}

        <div className="container">

          <img src={logo} alt="Betanote" className="authpage__logo"></img>

          <input type="text" placeholder="Login" id="username" className="authpage__input"/>
          <input type="password" placeholder="Password" id="password" className="authpage__input"/>

          <button className="authpage__button" onClick={this.registerHandler}>Register</button>

          <NavLink to="/login" className="authpage__link">Or log in</NavLink>

        </div>
      </div>
    );
  }
}

export default RegisterPage;