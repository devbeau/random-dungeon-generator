import React, { useState, useEffect, useReducer, useRef } from 'react';
import {reducer} from './reducer';
import createRooms from './createRooms';
import Grid from './Grid';
import './App.css';

const initialGrid = [35, 35];

export function init(initialPos) {
  return {x: initialPos[1], y: initialPos[0]}
}


// THE HASHMAP DOESN'T UPDATE IN THE EVENT LISTENER.
// HAVE TO FIND A WAY TO DETERMINE WHETHER THE SQUARES
// ARE WALKABLE BEFORE SENDING THE EVENT.

function App() {
  const [[grid, initialPos], setGrid] = useState(createRooms(initialGrid));
  let [squareState, dispatch] = useReducer(reducer, initialPos);
  let [gridMap, _setGridMap] = useState(generateHashMap(grid));
  
  const gridRef= useRef(gridMap);

  const setGridMap = (val) => {
    gridRef.current = val;
    _setGridMap(val);
  }
  console.log(squareState);

  function generateHashMap(grid){
    let map = new Map ();
    for (let i = 0; i < grid.length;i++){
      for (let j = 0; j < grid[0].length;j++){
        if (grid[i][j] === 'x') {
          map.set(`${i},${j}`, 'green');
        }
      }
    }
    ;
    return map;
  }



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
      <Grid 
      dispatch={dispatch}
      grid={grid}
      squareState={squareState}
      gridMap={gridRef}
      />
      <button onClick={onClick}> Generate Dungeon</button>
    </div>
  );
}

export default App;
