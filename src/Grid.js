import React, {useEffect, useState} from 'react';
import createRooms from './createRooms';

export default function Grid ({gridMap, dispatch, grid, setGrid, brush, squareState, endSquare, setEndSquare}){
    
let [clickedCell, setClickCell] = useState([]);

 const keyDownListener = ({keyCode}) => {
     console.log(gridMap.current);
    dispatch({type: `${keyCode}`, payload: gridMap.current});
 };


    useEffect(() => {
        document.addEventListener('keydown', keyDownListener)

        return () => {
            document.removeEventListener('keydown', keyDownListener)
        } 
      }, [])

      

      function determineColor(roomGrid){
        return roomGrid.map((row, indX) => {
          return row.map((cell, indY) => {
            if (squareState.x === indX && squareState.y === indY) {
              return cell = 'coral';
            } else if (endSquare.x ===indX && endSquare.y === indY){
              return cell = 'yellow';
            }
            return cell === 'x' ? 'lightblue' : '#EDEDED'; 
          })
        })
      }

      function onClick(event, i , j){
        event.stopPropagation();
        console.log(i, j);
        let newGrid = [...grid];
        if (brush === 'floor'){
          newGrid[i][j] = 'x';
          console.log(newGrid[i][j]);
        } else if (brush === 'wall'){
          newGrid[i][j] = '';
        } else if (brush === 'start'){
          dispatch({type: "CLICK", payload: {x: i, y: j}})
        } else if (brush === 'end'){
          setEndSquare({x: i, y: j});
        }
        if (brush !== 'start') {
          setGrid([newGrid, [squareState.y, squareState.x]]);
        }
      }
    return (
        <table>
        <tbody>
            {determineColor(grid).map((row, i) => {
            return (
                <tr key={`row-${i}`}>
                {row.map((col, j) => {
                return (
                <td
                    key={`col-${j}`}
                    onClick={(event) => {onClick(event, i, j)}}
                    style={{
                    margin: 0, 
                    width: 20, 
                    height: 20, 
                    border: '1px black solid', 
                    backgroundColor: col,
                }}>
                </td>)})}
                </tr>
            )
            })}
        </tbody>
        </table>
    )
}