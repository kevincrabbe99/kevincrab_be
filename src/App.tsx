
import './App.scss';
import { appConfig } from './configs/configurator';
import ScopeProxy from './ScopeProxy';

import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';


function App() {

  console.log("App()")
  console.log("App Config: ", appConfig)

// Initialize the firebase


  return (
    <div className="App" data-theme="dark">
      <ScopeProxy />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
