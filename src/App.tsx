import './App.css';
import GridSquare from './components/GridSquare'
import GridBoard from './components/GridBoard';
import NextBlock from "./components/NextBlock";
import ScoreBoard from "./components/ScoreBoard";

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <h1 className='App-title'>Tetris</h1>
            </header>
            <GridBoard/>
            <NextBlock/>
            <ScoreBoard/>
        </div>
    );
}

export default App;
