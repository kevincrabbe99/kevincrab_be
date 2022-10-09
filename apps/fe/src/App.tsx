import React from 'react';
import './App.scss';
import Desktop from './frames/desktop/Desktop';
import Login from './frames/login/Login';

function App() {
  return (
    <div className="App" data-theme="dark">
      
      <Login />
      {/* <Desktop /> */}

    </div>
  );
}

export default App;
