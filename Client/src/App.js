import React from 'react'
import MainSide from './Components/MainSide/MainSide';
import Sidebar from './Components/Sidebar/Sidebar';
import HeaderBar from './Components/HeaderBar/HeaderBar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import LoginPage from './Components/Authorization/LoginPage';
import RegisterPage from './Components/Authorization/RegisterPage';
import getData from './API/getData'
import { writeNote, deleteNote } from './API/Notes'

/* TODO:
 * - [X] Authorization server
 * - [X] API
 * - [X] Auth frontend
 * - [X] Auth validation
 * - [X] Exception alerts
 * - Upgrade universal alert
 * - NodeJS server for notes
 * - API for CRUD endpoints
 * - Refactoring frontend for work with endpoints
 * - [X] Animation when update mainside
 * - [X] Tags
 * - --Colors--
 * - [X] Last tags
 * - [X] Tags navigation
 * - Confirmations (close, reset, delete)
 * - Preloader
 * - Adaptive for mobile
 * - [X] Hints for buttons
 * - [X] Validate inputs
 * - Animation for tags line
 * - [X] Quick guide
 * - Animation for guide
 * - [X] Favicon & title
 * - DOCUMENTATION!!!
 * FIXME:
 * - [X] !BUG! reset changes in new task = error
 * - Unnecessary tagHandler (there is universal)
 * - Add special function for opening workspace
 * - Ref is null at LoginPage
 * - Create SEPARATED endpoints for creating and updating
 */

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [], // list of notes
      currentNote: {}, //selected note
      isWorkspaceOn: false, //enabling workspace
      lastTags: [], //last 3 tags
      auth: false, //did user authentificated
      userdata: {} //data {id, username}
    }
    this.getNoteList = this.getNoteList.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
    this.noteClickHandler = this.noteClickHandler.bind(this)
    this.saveCurrentNote = this.saveCurrentNote.bind(this)
    this.saveHandler = this.saveHandler.bind(this)
    this.createNewNote =this.createNewNote.bind(this)
    this.closeWorkspace = this.closeWorkspace.bind(this)
    this.deleteNoteHandler = this.deleteNoteHandler.bind(this)
    this.clearCurrentNote = this.clearCurrentNote.bind(this)
    this.resetChanges = this.resetChanges.bind(this)
    this.tagInputHandler = this.tagInputHandler.bind(this)
    this.getLastTags = this.getLastTags.bind(this)
    this.updateAuth = this.updateAuth.bind(this)
    this.getUserData = this.getUserData.bind(this)
  }

  // -- -- -- -- -- API methods (for endpoints)

  getNoteList() {
    getData('note-list').then(data => {
      if (!data.ok) console.log(data)
      this.setState({notes: data.noteList, auth: data.auth})
    })
  }

  saveNoteOnServer(note) {
    if((!note) || (!note.description) || (!note.content)) return alert('Note must have description & content') //Перенести в хендлер
    writeNote(note).then()
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

        alert(data.message)
        this.updateAuth(data.auth)

      } else {

        this.getNoteList()

      }
    })

    this.closeWorkspace()
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
    this.setState({currentNote: note, isWorkspaceOn: true})
  }

  // save selected note to storage

  saveCurrentNote() {
    writeNote(this.state.currentNote).then(data => {
      if (!data.ok) {

        this.updateAuth(data.auth)
        return alert(data.message)

      } else {
        this.getNoteList()
      }
    })
  }

  // handler for saving current note

  saveHandler() {
    if (this.state.currentNote.content === '') {
      return alert('Please write some content for note')
    }

    if (this.state.currentNote.description === '') {

      this.setState(state => {
        return(
          {
            currentNote: {
              ...state.currentNote,
              description: "New note"
            }
          }
        )
      }, this.saveCurrentNote())

    } else {
      this.saveCurrentNote()
    }
  }

  // create new current note

  createNewNote() {
    this.setState({currentNote: {
      description: '',
      content: "",
      tag: ""
    }, isWorkspaceOn: true})
  }

  // clear selected note in app cache

  clearCurrentNote() {
    this.setState({currentNote: {}})
  }

  // reset unsaved changes for current note

  resetChanges() {
    if (this.getNoteById(this.state.currentNote._id)) {
      this.setState(state => {
          return {
            currentNote: this.getNoteById(state.currentNote._id)
          }
      })
    } else {
      this.setState(state => {
          return {
            currentNote: {
              ...state.currentNote,
              description: '',
              content: ''
            }
          }
      })
    }
  }

  // -- -- -- -- --
  // UI Methods & handlers
  // -- -- -- -- --

  // Setting local storage

  setLocalStorage() {
    const notesData = JSON.stringify(this.state.notes)
    localStorage.setItem('notesData', notesData)
  }

  // Universal handler for input (notes)

  inputHandler(event) {
    this.setState(state => {
      return {currentNote: 
        {...state.currentNote, [event.target.name]: event.target.value}
      }
    })
  }

  // FIXME: unnecessary handler for tags

  tagInputHandler(event) {
    this.setState(state => {
        return {
          currentNote: {
            ...state.currentNote,
            tag: event.target.value
          }
        }
    })
  }

  // show start screen

  closeWorkspace() {
    this.setState({isWorkspaceOn: false}, () => {
      this.clearCurrentNote()
      this.getLastTags()
    })
  }

  getLastTags() {
    const tagsArr = this.state.notes.map(elem => elem.tag)

    const cleanTagsArr = []
    //Clear dublicates
    for (let i = 0; i < tagsArr.length; i++) {
      const elem = tagsArr[i]
      if (!(elem === tagsArr[i - 1] || elem === '')) {
        cleanTagsArr.push(elem)
      }
    }

    const newTags = []
    //Shortening to 3 elements in massive
    for (let i = 0; i < 3 && i < cleanTagsArr.length; i++) {
      newTags.push(cleanTagsArr[i])
    }

    this.setState({lastTags: newTags})
  }

  setInitialCookie() {
    function setCookie(name, value, options = {}) {
      options = {
        path: '/',
        ...options
      };

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }
    
      document.cookie = updatedCookie;
    }

    let date = new Date(Date.now() + 15552000e3);
    date = date.toUTCString();
    setCookie('needGuide', false, {expires: date})
  }

  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  updateAuth(auth) {
    this.setState({auth}, () => {
      this.getUserData()
    })
  }

  getUserData() {
    getData('logged').then(data => {
      if (data.ok) return this.setState({userdata: data.userdata, auth: data.auth})
    })
  }

  componentDidMount() {
    this.getUserData()
    this.getNoteList()
    this.getLastTags()
  }

  componentDidUpdate() {
    this.setLocalStorage()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="page">

          <Route exact path="/">

            {this.state.auth ? false : <Redirect to="/login" />}

            <HeaderBar auth={this.state.auth} userdata={this.state.userdata} updateAuth={this.updateAuth} />

            <div className="app">

              <Sidebar
              notes={this.state.notes}
              noteClickHandler={this.noteClickHandler}
              createNewNote={this.createNewNote}
              lastTags={this.state.lastTags}
              />

              <MainSide
              currentNote={this.state.currentNote}
              inputHandler={this.inputHandler}
              isWorkspaceOn={this.state.isWorkspaceOn}
              saveHandler={this.saveHandler}
              closeWorkspace={this.closeWorkspace}
              deleteNoteHandler={this.deleteNoteHandler}
              resetChanges={this.resetChanges}
              tagInputHandler={this.tagInputHandler}
              getCookie={this.getCookie}
              />

            </div>

          </Route>

          <Route exact path="/register">
            <RegisterPage updateAuth={this.updateAuth} auth={this.state.auth} />
          </Route>

          <Route exact path="/login">
            <LoginPage updateAuth={this.updateAuth} auth={this.state.auth} />
          </Route>
      
        </div>
      </BrowserRouter>
    );
  }
}

export default App;