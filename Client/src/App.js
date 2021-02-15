import React from 'react'
import MainSide from './Components/MainSide/MainSide';
import Sidebar from './Components/Sidebar/Sidebar';
import HeaderBar from './Components/HeaderBar/HeaderBar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import LoginPage from './Components/Authorization/LoginPage';
import RegisterPage from './Components/Authorization/RegisterPage';
import getData from './API/getData'
import { createNote, updateNote, deleteNote } from './API/Notes'
import GuidePage from './Components/GuidePage/GuidePage';
import Alert, { displayAlert } from './Components/Alert/Alert';
import WOW from 'wowjs'

/* TODO:
 * - [X] Authorization server
 * - [X] API
 * - [X] Auth frontend
 * - [X] Auth validation
 * - [X] Exception alerts
 * - [X] Create custom alert
 * - [X] NodeJS server for notes
 * - [X] API for CRUD endpoints
 * - [X] Refactoring frontend for work with endpoints
 * - [X] Animation when update mainside
 * - [X] Tags
 * - --Colors--
 * - [X] Last tags
 * - [X] Tags navigation
 * - Confirmations (close, reset, delete)
 * - Preloader
 * - Adaptive for mobile!!!
 * - [X] Hints for buttons
 * - [X] Validate inputs
 * - Animation for tags line
 * - [X] Quick guide
 * - --Animation for guide--
 * - [X] Favicon & title
 * - DOCUMENTATION!!!
 * - Move guide to other route
 * - Active note must highlighted in list
 * - Improve searching by tags
 * FIXME:
 * - [X] !BUG! reset changes in new task = error
 * - [X] Unnecessary tagInputHandler (there is universal)
 * - [X] Add special function for opening workspace
 * - [X] Ref is null at LoginPage
 * - [X] Create SEPARATED endpoints for creating and updating
 * - Rerendering app after any action
 */

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [], // list of notes
      currentNote: {}, //selected note
      isWorkspaceOn: false, //enabling workspace
      auth: false, //did user authentificated
      userdata: {} //data {id, username}
    }
    this.getNoteList = this.getNoteList.bind(this)
    this.createNoteOnServer = this.createNoteOnServer.bind(this)
    this.updateNoteOnServer = this.updateNoteOnServer.bind(this)
    this.noteClickHandler = this.noteClickHandler.bind(this)
    this.saveCurrentNote = this.saveCurrentNote.bind(this)
    this.createNewNote = this.createNewNote.bind(this)
    this.closeWorkspace = this.closeWorkspace.bind(this)
    this.openWorkSpace = this.openWorkSpace.bind(this)
    this.deleteNoteHandler = this.deleteNoteHandler.bind(this)
    this.clearCurrentNote = this.clearCurrentNote.bind(this)
    this.updateAuth = this.updateAuth.bind(this)
    this.getUserData = this.getUserData.bind(this)
    this.updateCurrentNote = this.updateCurrentNote.bind(this)
    this.getNoteById = this.getNoteById.bind(this)
  }

  // -- -- -- -- --
  // API methods (for endpoints)
  // -- -- -- -- --

  getNoteList() {
    getData('note-list').then(data => {
      if (!data.ok) console.log(data)
      if (!data.noteList) data.noteList = []
      this.setState({notes: data.noteList, auth: data.auth})
    })
  }

  // delete note which is selected

  deleteNoteHandler() {
    if(!this.state.currentNote._id) {
      this.clearCurrentNote()
      this.closeWorkspace()
      return
    }

    deleteNote(this.state.currentNote._id).then(data => {
      if(!data.ok) {

        displayAlert(data.message)
        this.updateAuth(data.auth)

      } else {

        this.getNoteList()

      }
    })

    this.closeWorkspace()
  }

  createNoteOnServer(note) {
    if (note._id) return this.updateNoteOnServer(note)
    if((!note.description) || (!note.content)) return displayAlert('Note must have descripion and content')
    createNote(note).then(data => {
      if (!data.ok) return console.log(data)
      console.log(data)
      this.setState(state => {
        return {
          ...this.state,
          currentNote: {
            ...state.currentNote,
            _id: data.noteId
          }
        }
      }, this.getNoteList())
    })
  }

  updateNoteOnServer(note) {
    if (!note._id) return this.createNoteOnServer(note)
    if((!note.description) || (!note.content)) return displayAlert('Note must have descripion and content')

    updateNote(note).then(data => {
      if (!data.ok) return console.log(data)
      this.getNoteList()
    })
  }

  // -- -- -- -- --
  // Note Methods & handlers
  // -- -- -- -- --

  // getting note by it id from state.notes

  getNoteById(id) {
    const note = this.state.notes.filter(element => {
      return element._id === id
    })
    if (note.length < 1) return false
    return note[0]
  }

  // Handler for clicking on note from list

  noteClickHandler(event) {
    const id = event.currentTarget.id
    const note = this.getNoteById(id)
    this.setState({currentNote: note}, this.openWorkSpace())
  }

  // save selected note to storage

  saveCurrentNote() {
    let note = this.state.currentNote
    if((!note) || (!note.description) || (!note.content)) return displayAlert('Note must have description & content')

    const existingNote = this.getNoteById(note._id)
    if (!existingNote) return this.createNoteOnServer(note)
    return this.updateNoteOnServer(note)
  }

  // create new current note

  createNewNote() {
    this.setState({currentNote: {
      description: '',
      content: "",
      tag: ""
    }}, this.openWorkSpace())
  }

  // clear selected note in app cache

  clearCurrentNote() {
    this.setState({currentNote: {}})
  }

  // -- -- -- -- --
  // App Methods & handlers
  // -- -- -- -- --

  // updating current note at App state

  async updateCurrentNote(note) {
    this.setState({currentNote: note})
  }

  // show start screen

  closeWorkspace() {
    this.setState({isWorkspaceOn: false}, () => {
      this.clearCurrentNote()
    })
  }

  // open workspace

  openWorkSpace() {
    this.setState({isWorkspaceOn: true})
  }

  // update auth state in app

  updateAuth(auth) {
    this.setState({auth}, () => {
      if (auth) {
        this.getNoteList()
      } else {
        this.setState({notes: []})
      }
    })
  }

  // get data about logged user & get AUTH 

  getUserData() {
    getData('logged').then(data => {
      if (data.ok) return this.setState({userdata: data.userdata, auth: data.auth})
      if (!data.ok && !data.auth) return this.setState({userdata: {}, auth: data.auth})
    })
  }

  componentDidMount() {
    this.getUserData()
    this.getNoteList()

    // Initialise wow
    new WOW.WOW({
      live: false
    }).init();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="page">
          <Alert />

          <Route exact path="/">

            {this.state.auth ? false : <Redirect to="/login" />}

            <HeaderBar auth={this.state.auth} userdata={this.state.userdata} updateAuth={this.updateAuth} />

            <div className="app">

              <Sidebar
                notes={this.state.notes}
                noteClickHandler={this.noteClickHandler}
                createNewNote={this.createNewNote}
              />

              <MainSide
                currentNote={this.state.currentNote}
                isWorkspaceOn={this.state.isWorkspaceOn}
                closeWorkspace={this.closeWorkspace}
                deleteNoteHandler={this.deleteNoteHandler}
                saveCurrentNote={this.saveCurrentNote}
                updateCurrentNote={this.updateCurrentNote}
                getNoteById={this.getNoteById}
              />

            </div>

          </Route>

          <Route exact path="/register">
            <RegisterPage updateAuth={this.updateAuth} auth={this.state.auth} />
          </Route>

          <Route exact path="/login">
            <LoginPage updateAuth={this.updateAuth} auth={this.state.auth} />
          </Route>

          <Route exact path="/guide">
            <GuidePage />
          </Route>
      
        </div>
      </BrowserRouter>
    );
  }
}

export default App;