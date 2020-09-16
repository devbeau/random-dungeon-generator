import React, {useEffect, useState} from 'react';
import createRooms from './createRooms';

export default function Grid ({gridMap, dispatch, grid, setGrid, brush, squareState}){
    
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
              return cell = 'red';
            } 
            return cell === 'x' ? 'green' : 'black'; 
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
        }
        setGrid([newGrid, [squareState.y, squareState.x]]);
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
                    onClick={(event) => {

                      onClick(event, i, j)}}
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