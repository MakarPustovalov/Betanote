import { React, Component } from 'react';
import { NavLink } from 'react-router-dom'
import logout from '../../API/logout'

class HeaderBar extends Component {
  constructor() {
    super()
    this.logoutHandler = this.logoutHandler.bind(this)
  }

  logoutHandler() {
    logout().then(data => this.props.updateAuth(data.auth))
  }

  render() {
    return (
      <nav className="headerbar">
        <NavLink to="/guide" className="headerbar__link">How to use?</NavLink>
  
        {this.props.auth ?
          <div className="headerbar__right">
            <p className="headerbar__text">Welcome, {this.props.userdata.username}!</p>
            <p to="/logout" className="headerbar__link" onClick={this.logoutHandler}>Logout</p>
          </div>
          :
          <div className="headerbar__right">
            <p className="headerbar__text">You are not logged in</p>
            <NavLink to="/login" className="headerbar__link">Login</NavLink>
            <NavLink to="/register" className="headerbar__link">Register</NavLink>
          </div>
        }
      </nav>
    );
  }
}

export default HeaderBar;