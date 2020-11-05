import React from 'react'
import MainSide from './Components/MainSide/MainSide';
import Sidebar from './Components/Sidebar/Sidebar';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [
        {
          id: `id-1-${(+new Date).toString()}`,
          description: 'My note 1',
          content: "Hello world! I'm a note!",
        },
        {
          id: `id-2-${(+new Date).toString()}`,
          description: 'My note 2',
          content: "Hello world! I'm a second note!",
        },
        {
          id: `id-3-${(+new Date).toString()}`,
          description: 'My note 3',
          content: "Hello world! I'm a third note!",
        },
      ],
      currentNote: {},
      isWorkspaceOn: false,
    }
    this.inputHandler = this.inputHandler.bind(this)
    this.noteClickHandler = this.noteClickHandler.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.createNewNote =this.createNewNote.bind(this)
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
      })
    } else if (!activeNote) {
      const newNotes = this.state.notes
      newNotes.unshift(this.state.currentNote)

      this.setState(state => {
        return {
          ...state,
          notes: newNotes
        }
      })
    }
  }

  createNewNote() {
    this.setState({currentNote: {
      id: `id-3-${(+new Date).toString()}`,
      description: '',
      content: "",
    }, isWorkspaceOn: true})
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
        />
    
      </div>
    );
  }
}

export default App;
