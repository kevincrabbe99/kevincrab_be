import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, useSelector } from 'react-redux';
import './App.scss';
import FrameRouter from './frames/frameRouter/FrameRouter';
import { FrameState } from './reducers/frameReducer';

function App() {

  return (
    <div className="App" data-theme="dark">
        <FrameRouter />
    </div>
  );
}

export default App;
