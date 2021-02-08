import React, { Component } from 'react';
import './Input.scss'

class Input extends Component {
  constructor() {
    super()
    this.input = React.createRef()
    this.errorHandler = this.errorHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.state = {
      trigger: false //this trigger will be setted up if error confirmed. It says to clickHandler to reset styles & placeholder to default (It's all what i can come up with)
    }
  }

  errorHandler(message) {
    this.input.current.classList.add('error')
    this.input.current.value = ''
    this.input.current.placeholder = message
    this.setState({trigger: true}) //setting up trigger for clickHandler
  }

  clickHandler() {
    if (this.state.trigger) { //if trigger is set as true:
      this.input.current.classList.remove('error')
      this.input.current.placeholder = this.props.placeholder
      this.setState({trigger: false}) //reset trigger
    }
  }

  render() {
    return (
      <input onClick={this.clickHandler} ref={this.input} type={this.props.type} placeholder={this.props.placeholder} id={this.props.id} className="authpage__input"/>
    );
  }
}

export default Input;