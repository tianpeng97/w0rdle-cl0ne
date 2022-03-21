import './App.css';
import { createContext } from 'react';
import { AppContextProvider } from './Context';
import Board from './components/Board';
import Keyboard from './components/Keyboard';

export const AppContext = createContext();

function App() {
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContextProvider>
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;
