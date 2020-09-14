import React, {useEffect} from 'react';

export default function Grid ({gridMap, dispatch, grid, squareState}){
    

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