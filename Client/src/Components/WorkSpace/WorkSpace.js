import React, { Component } from 'react'
import WorkSpaceHeader from '../WorkSpaceHeader/WorkSpaceHeader'
import WorkSpaceMain from '../WorkSpaceMain/WorkSpaceMain'

class WorkSpace extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isTagInputShow: false
    }
    this.setTagBtnHandler = this.setTagBtnHandler.bind(this)
    this.hideTagInput = this.hideTagInput.bind(this)
  }

  setTagBtnHandler() {
    this.setState(state => {return {isTagInputShow: !state.isTagInputShow}}, () => {
      const elem = document.querySelector('.mainside__tag-input')
      if (this.state.isTagInputShow && elem) {
        elem.style.visibility = "visible"
        elem.classList.add('fadeInDown')
        elem.classList.remove('fadeOutUp')
      } else if (elem) {
        elem.classList.add('fadeOutUp')
        elem.classList.remove('fadeInDown')
      }
    })
  }

  hideTagInput() {
    this.setState({isTagInputShow: false}, () => {
        const elem = document.querySelector('.mainside__tag-input')
        if (elem) {
          elem.classList.remove('fadeInDown')
          elem.classList.add('fadeOutUp')
        }
      }
    )
  }
  
  render() {
    return(
      <>
        <WorkSpaceHeader
          currentNote={this.props.currentNote}
          noteInputHandler={this.props.noteInputHandler}
          saveCurrentNote={this.props.saveCurrentNote}
          closeWorkspace={this.props.closeWorkspace}
          deleteNoteHandler={this.props.deleteNoteHandler}
          resetChanges={this.props.resetChanges}
          setTagBtnHandler={this.props.setTagBtnHandler}
        />
  
        <WorkSpaceMain 
          currentNote={this.props.currentNote}
          noteInputHandler={this.props.noteInputHandler}
          hideTagInput={this.props.hideTagInput}
        />
      </>
    )
  }
}

export default WorkSpace;