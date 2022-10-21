import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, useSelector } from 'react-redux';
import './App.scss';
import FrameRouter from './frames/frameRouter/FrameRouter';
import { FrameState, FrameStatesEnum } from './reducers/frameReducer';
import "./assets/crt.scss"

function App() {

  const frame: FrameState = useSelector((state: any) => state.frame);
  const crtRef = useRef<HTMLDivElement>(null)
  const crtTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(frame.state === FrameStatesEnum.SHUTDOWN) {
      crtRef.current?.classList.replace("crt", "crt-heavy")
      crtTextRef.current?.classList.replace("crt-text", "crt-text-heavy")
    } else {
      crtRef.current?.classList.replace("crt-heavy", "crt")
      crtTextRef.current?.classList.replace("crt-text-heavy", "crt-text")
    }
  }, [frame])

  return (
    <div className="App" data-theme="dark">
      <div className="crt" ref={crtRef}>
      </div>
      <span className="crt-text" ref = {crtTextRef}>
        <FrameRouter />
      </span>
    </div>
  );
}

export default App;
