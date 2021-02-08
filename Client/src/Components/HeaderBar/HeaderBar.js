import React from 'react';
import { NavLink } from 'react-router-dom'
import logout from '../../API/logout'

const HeaderBar = ({auth, userdata}) => {
  console.log(auth)
  return (
    <nav className="headerbar">
      <NavLink to="/guide" className="headerbar__link">How to use?</NavLink>

      {auth ?
        <div className="headerbar__right">
          <p className="headerbar__text">Welcome, {userdata.username}!</p>
          <p to="/logout" className="headerbar__link" onClick={logout}>Logout</p>
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

export default HeaderBar;