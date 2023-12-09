
import './App.scss';
import { appConfig } from './configs/configurator';
import ScopeProxy from './ScopeProxy';




function App() {

  console.log("App()")
  console.log("App Config: ", appConfig)

// Initialize the firebase


  return (
    <div className="App" data-theme="dark">
      <ScopeProxy />
    </div>
  );
}

export default App;
