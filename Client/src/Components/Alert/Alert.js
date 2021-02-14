import React from 'react';
import './Alert.scss'

const Alert = ({ message, mode }) => {

  return (
    <div className={`alert ${mode === 'info' ? 'info' : ''} wow fadeInDown`}>
      <p className="alert__text">{message}</p>
    </div>
  );
}

export default Alert;