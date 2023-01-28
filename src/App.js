import './App.css';

import GridSquare from './components/GridSquare'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Tetris</h1>
            </header>
            <GridSquare color="2"/>
        </div>
    );
}

export default App;