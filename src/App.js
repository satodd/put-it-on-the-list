import React from 'react';
import MainDisplay from './MainDisplay'

class App extends React.Component {
  render() {
      return (
        <div className="container">
        	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
         	<MainDisplay />
        </div>
      );
  }
}

export default App;
