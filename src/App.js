import React from 'react'
import MainSide from './Components/MainSide/MainSide';
import Sidebar from './Components/Sidebar/Sidebar';

/* TODO:
 * - NodeJS Backend server (with authentification)
 * - [X] Animation when update mainside
 * - Tags
 * - Tags navigation
 * - Confirmations (close, reset, delete)
 * - Preloader
 * - Adaptive for mobile
 * - [X] Hints for buttons
 */

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: JSON.parse(localStorage.getItem('notesData')) ? JSON.parse(localStorage.getItem('notesData')) : [],
      currentNote: {},
      isWorkspaceOn: false,
    }
    this.inputHandler = this.inputHandler.bind(this)
    this.noteClickHandler = this.noteClickHandler.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.createNewNote =this.createNewNote.bind(this)
    this.closeWorkspace = this.closeWorkspace.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.clearCurrentNote = this.clearCurrentNote.bind(this)
    this.resetChanges = this.resetChanges.bind(this)
  }

  setLocalStorage() {
    const notesData = JSON.stringify(this.state.notes)
    localStorage.setItem('notesData', notesData)
  }

  inputHandler(event) {
    this.setState(state => {
      return {currentNote: 
        {...state.currentNote, [event.target.name]: event.target.value}
      }
    })
  }

  getNoteById(id) {
    const note = this.state.notes.filter(element => {
      return element.id === id
    })
    if (note.length > 0) return note[0]
    return false
  }

  noteClickHandler(event) {
    const id = event.target.id
    const note = this.getNoteById(id)
    this.setState({currentNote: note, isWorkspaceOn: true})
  }

  closeWorkspace() {
    this.setState({isWorkspaceOn: false}, this.clearCurrentNote())
  }

  saveNote() {
    const activeNote = this.getNoteById(this.state.currentNote.id)

    if (activeNote) {
      const newNotes = this.state.notes.map(element => {
        if (element === activeNote) return this.state.currentNote
        return element
      })

      this.setState(state => {
        return {
          ...state,
          notes: newNotes
        }
      }, this.setLocalStorage)
    } else if (!activeNote) {
      const newNotes = this.state.notes
      newNotes.unshift(this.state.currentNote)

      this.setState(state => {
        return {
          ...state,
          notes: newNotes
        }
      }, this.setLocalStorage)
    }
  }

  createNewNote() {
    this.setState({currentNote: {
      id: `${(+new Date).toString()}`,
      description: '',
      content: "",
    }, isWorkspaceOn: true})
  }

  clearCurrentNote() {
    this.setState({currentNote: {}})
  }

  deleteNote() {
    const activeNote = this.getNoteById(this.state.currentNote.id)
    const newNotes = this.state.notes.filter(elem => {
      return elem !== activeNote
    })
    this.setState({notes: newNotes})
    this.closeWorkspace()
  }

  resetChanges() {
    this.setState(state => {
      return {
        currentNote: this.getNoteById(state.currentNote.id)
      }
    })
  }

  componentDidUpdate() {
    this.setLocalStorage()
  }

  render() {
    console.log(this.state)

    return (
      <div className="page">

        <Sidebar
        notes={this.state.notes}
        noteClickHandler={this.noteClickHandler}
        createNewNote={this.createNewNote}
        />

        <MainSide
        currentNote={this.state.currentNote}
        inputHandler={this.inputHandler}
        isWorkspaceOn={this.state.isWorkspaceOn}
        saveNote={this.saveNote}
        closeWorkspace={this.closeWorkspace}
        deleteNote={this.deleteNote}
        resetChanges={this.resetChanges}
        />
    
      </div>
    );
  }
}

export default App;
