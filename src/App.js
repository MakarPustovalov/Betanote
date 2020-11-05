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
      ]
    }
  }

  render() {

    return (
      <div className="page">

        <Sidebar notes={this.state.notes} />

        <MainSide />
    
      </div>
    );
  }
}

export default App;
