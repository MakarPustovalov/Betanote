import React, { Component } from 'react'
import WorkSpaceHeader from '../WorkSpaceHeader/WorkSpaceHeader'
import WorkSpaceMain from '../WorkSpaceMain/WorkSpaceMain'

class WorkSpace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTagInputShow: false, // set true if input for tag is showed
      currentNote: {
        description: '',
        content: "",
        tag: ""
      }, // selected note
    }
    this.setTagBtnHandler = this.setTagBtnHandler.bind(this)
    this.hideTagInput = this.hideTagInput.bind(this)
    this.noteInputHandler = this.noteInputHandler.bind(this)
    this.saveNoteHandler = this.saveNoteHandler.bind(this)
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

  noteInputHandler(event) {
    this.setState(state => {
      return {currentNote:
        {...state.currentNote, [event.target.name]: event.target.value}
      }
    })
  }

  async saveNoteHandler () {
    await this.props.updateCurrentNote(this.state.currentNote)
    this.props.saveCurrentNote()
  }

  componentDidMount() {
    this.setState({currentNote: this.props.currentNote})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentNote !== this.props.currentNote) this.setState({currentNote: this.props.currentNote})
  }
  
  render() {
    return(
      <>
        <WorkSpaceHeader
          currentNote={this.state.currentNote}
          noteInputHandler={this.noteInputHandler}
          saveNoteHandler={this.saveNoteHandler}
          closeWorkspace={this.props.closeWorkspace}
          deleteNoteHandler={this.props.deleteNoteHandler}
          resetChanges={this.props.resetChanges}
          setTagBtnHandler={this.setTagBtnHandler}
        />
  
        <WorkSpaceMain 
          currentNote={this.state.currentNote}
          noteInputHandler={this.noteInputHandler}
          hideTagInput={this.hideTagInput}
        />
      </>
    )
  }
}

export default WorkSpace;