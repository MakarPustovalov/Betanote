import React, { Component } from 'react';
import './Alert.scss'

class Alert extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id='alert' className={`${this.props.mode === 'info' ? 'info' : 'error'} alert animated`}>
        <p className="alert__text">Error</p>
      </div>
    );
  }
}

export default Alert;

export const displayAlert = (message) => {
  const alert = document.getElementById('alert')
  alert.children[0].textContent = message

  alert.classList.add('fadeInDown')
  alert.style.display = 'block'

  setTimeout(() => {

    alert.classList.remove('fadeInDown')
    alert.classList.add('fadeOutUp')
    setTimeout(() => {alert.style.display = 'none'}, 500)

  }, 3500)
}