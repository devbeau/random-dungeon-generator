import React, { useState, useEffect, useReducer, useRef } from 'react';
import {reducer} from './reducer';
import createRooms from './createRooms';
import Toolbar from './Toolbar';
import Grid from './Grid';
import './App.css';

const initialGrid = [35, 35];

export function init(initialPos) {
  return {x: initialPos[1], y: initialPos[0]}
}

function App() {
  const [[grid, initialPos], setGrid] = useState(createRooms(initialGrid));
  let [squareState, dispatch] = useReducer(reducer, initialPos);
  let [gridMap, _setGridMap] = useState(generateHashMap(grid));
  let [brush, setBrush] = useState('');

  const gridRef = useRef(gridMap);

  const setGridMap = (val) => {
    gridRef.current = val;
    _setGridMap(val);
  };

  function generateHashMap(grid){
    let map = new Map ();
    for (let i = 0; i < grid.length;i++){
      for (let j = 0; j < grid[0].length;j++){
        if (grid[i][j] === 'x') {
          map.set(`${i},${j}`, 'green');
        };
      };
    };
    return map;
  };

  function onClick(){
    setGrid(createRooms(initialGrid));
    console.log(initialPos, gridMap);
  }
  
  useEffect(() => {
    setGridMap(generateHashMap(grid));
    dispatch({type: `RESET`, payload: initialPos});
    // setDisplayGrid(determineColor(grid));
  },[initialPos])
  
  return (
    <div className="App">
      <Toolbar setBrush={setBrush} brush={brush}/>
      <Grid 
      dispatch={dispatch}
      grid={grid}
      setGrid={setGrid}
      squareState={squareState}
      gridMap={gridRef}
      brush={brush}
      />
      <button onClick={onClick}> Generate Dungeon</button>
    </div>
  );
}

export default App;
