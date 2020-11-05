import React from 'react'
import MainSide from './Components/MainSide/MainSide';
import Sidebar from './Components/Sidebar/Sidebar';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [
        {
          id: (+new Date).toString(),
          description: 'My note',
          content: "Hello world! I'm a note!",
        },
        {
          id: (+new Date).toString(),
          description: 'My note2',
          content: "Hello world! I'm a note!",
        },
        {
          id: (+new Date).toString(),
          description: 'My note3',
          content: "Hello world! I'm a note!",
        },
      ],
      currentNote: 
      {
        id: (+new Date).toString(),
        description: '',
        content: "",
      },
    }
    this.descriptionInputHandler = this.descriptionInputHandler.bind(this)
    this.contentInputHandler = this.descriptionInputHandler.bind(this)
  }

  descriptionInputHandler(event) {
    this.setState(state => {
      return {currentNote: 
        {...state.currentNote, description: event.target.value}
      }
    })
  }

  contentInputHandler(event) {
    this.setState(state => {
      return {currentNote: 
        {...state.currentNote, content: event.target.value}
      }
    })
  }

  render() {
    console.log(this.state)

    return (
      <div className="page">

        <Sidebar
        notes={this.state.notes}
        />

        <MainSide
        currentNote={this.state.currentNote}
        descriptionInputHandler={this.descriptionInputHandler}
        contentInputHandler={this.contentInputHandler}
        />
    
      </div>
    );
  }
}

export default App;
