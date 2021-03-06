
import Window from './components/window/Window'
import logo from './logo.svg';
import './App.css';
import Desktop from './components/OS/desktop/Desktop'

function App() {
  return (
    <div className="App">
      <div className = "window_margin">
          <Window />
        </div>
          <Desktop />
    </div>
  );
}

export default App;
