import React from 'react'
import MainSide from './Components/MainSide/MainSide';
import Sidebar from './Components/Sidebar/Sidebar';
import getData from './API/getData'
import HeaderBar from './Components/HeaderBar/HeaderBar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import LoginPage from './Components/Authorization/LoginPage';
import RegisterPage from './Components/Authorization/RegisterPage';

/* TODO:
 * - [X] Authorization server
 * - API
 * - Auth frontend
 * - NodeJS server
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
 */

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: JSON.parse(localStorage.getItem('notesData')) ? //list of notes
      JSON.parse(localStorage.getItem('notesData')) : [],
      currentNote: {}, //selected note
      isWorkspaceOn: false, //enabling workspace
      lastTags: [], //last 3 tags
      auth: 'false',
      userdata: {}
    }
    this.inputHandler = this.inputHandler.bind(this)
    this.noteClickHandler = this.noteClickHandler.bind(this)
    this.saveCurrentNote = this.saveCurrentNote.bind(this)
    this.saveHandler = this.saveHandler.bind(this)
    this.createNewNote =this.createNewNote.bind(this)
    this.closeWorkspace = this.closeWorkspace.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.clearCurrentNote = this.clearCurrentNote.bind(this)
    this.resetChanges = this.resetChanges.bind(this)
    this.tagInputHandler = this.tagInputHandler.bind(this)
    this.getLastTags = this.getLastTags.bind(this)
    this.updateAuth = this.updateAuth.bind(this)
  }

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

  // Handler for clicking on note from list

  noteClickHandler(event) {
    const id = event.currentTarget.id
    const note = this.getNoteById(id)
    this.setState({currentNote: note, isWorkspaceOn: true})
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

  // getting note by it id from state.notes

  getNoteById(id) {
    const note = this.state.notes.filter(element => {
      return element.id === id
    })
    if (note.length > 0) return note[0]
    return false
  }

  // show start screen

  closeWorkspace() {
    this.setState({isWorkspaceOn: false}, () => {
      this.clearCurrentNote()
      this.getLastTags()
    })
  }

  // save selected note to storage

  saveCurrentNote() {
    const activeNote = this.getNoteById(this.state.currentNote.id)

    if (activeNote) {
      //Updating notesArr
      const newNotes = this.state.notes.map(element => {
        if (element === activeNote) return this.state.currentNote
        return element
      })

      this.setState(state => {
          return {
            ...state,
            notes: newNotes
          }
        }, () => {
          this.setLocalStorage()
          this.getLastTags()
      })
    } else if (!activeNote) {
      //Adding new note to notesArr
      const newNotes = this.state.notes
      newNotes.unshift(this.state.currentNote)

      this.setState(state => {
          return {
            ...state,
            notes: newNotes
          }
        }, () => {
          this.setLocalStorage()
          this.getLastTags()
      })
    }
  }

  // handler for saving current note

  saveHandler() {
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
    
    this.setInitialCookie()
  }

  // create new current note

  createNewNote() {
    this.setState({currentNote: {
        id: `${(+new Date).toString()}`,
        description: '',
        content: "",
        tag: ""
      }, isWorkspaceOn: true})
  }

  // clear selected note in app cache

  clearCurrentNote() {
    this.setState({currentNote: {}})
  }

  // selete note which is selected

  deleteNote() {
    const activeNote = this.getNoteById(this.state.currentNote.id)
    //filter deleted note from notes arr
    const newNotes = this.state.notes.filter(elem => {
      return elem !== activeNote
    })

    this.setState({notes: newNotes})
    this.closeWorkspace()
  }

  resetChanges() {
    if (this.getNoteById(this.state.currentNote.id)) {
      this.setState(state => {
          return {
            currentNote: this.getNoteById(state.currentNote.id)
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
    this.setState({auth}, this.forceUpdate())
  }

  componentDidMount() {
    this.getLastTags()
    getData('/logged').then(data => {
      if (data.ok) this.setState({userdata: data.userdata}, this.updateAuth(data.auth))
    })
  }

  componentDidUpdate() {
    this.setLocalStorage()
  }

  render() {
    console.log(this.state)

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
              deleteNote={this.deleteNote}
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
