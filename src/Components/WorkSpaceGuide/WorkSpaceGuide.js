import React from 'react'

class WorkSpaceGuide extends React.Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      text: 'Write content of your task here',
      class: 'arrow'
    }
    this.buttonHandler = this.buttonHandler.bind(this)
    this.setText = this.setText.bind(this)
    this.setClass = this.setClass.bind(this)
  }

  buttonHandler() {
    this.setState(state => {
      return ({
        step: state.step + 1
      })
    }, () => {
      this.setText()
      this.setClass()
    })
  }

  setText() {
    if (this.state.step === 1) {
      this.setState({text: 'Enter description of your task here'})
    } else if (this.state.step === 2) {
      this.setState({text: 'Remember to save your task here'})
    }
  }

  setClass() {
    if (this.state.step === 1) {
      this.setState({class: 'arrow1'})
    } else if (this.state.step === 2) {
      this.setState({class: 'arrow2'})
    }
  }

  render() {

    return(
      <>
        {this.state.step < 3 ? 
          <div className={`mainside__guide-window ${this.state.class}`}>
            <p className="mainside__guide-text">{this.state.text}</p>
            <button onClick={this.buttonHandler} className="mainside__guide-button">Next</button>
          </div>
          : false}
      </>
    )
  }
}

export default WorkSpaceGuide