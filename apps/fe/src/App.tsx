import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.scss';
import CrtFilter from './frames/crtFilter/CrtFilter';

function App() {



  return (
    <div className="App" data-theme="dark">
      <CrtFilter />
    </div>
  );
}

export default App;
