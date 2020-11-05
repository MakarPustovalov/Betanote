import React from 'react'
import MainSide from './Components/MainSide/MainSide';
import Sidebar from './Components/Sidebar/Sidebar';

class App extends React.Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div class="page">

        <Sidebar />

        <MainSide />
    
      </div>
    );
  }
}

export default App;
