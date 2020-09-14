export default function createRooms([gridX, gridY]){

// NEEDS REFACTORING
// CREATE SMALLER FUNCTIONS
// & DRYER CODE

// !!! Future !!! Allow customization from formValues

    const newGrid = Array.from(new Array(gridX).fill(new Array(gridY).fill(undefined)));

    function createRectangle(coords, grid){
        const [width, length, offsetX, offsetY] = [...coords];
        let returnGrid = [...grid]

        for (let i = offsetX; i < returnGrid.length; i++){
            if (i < width + offsetX) {
                let innerArray = [...returnGrid[i]];
                    for (let j = offsetY; j < innerArray.length; j++){
                        if  (j < length + offsetY) innerArray[j] = 'x';
                    }
                returnGrid[i] = innerArray;    
            }
        }
        return returnGrid;
    }

    // Check to make sure rectangles do not overlap
    // !! X and Y are swapped and should be changed
    function checkBounds(coordsArray, rectangleAttempt){
        const ROOM_SEPARATION_MIN = 3
        const [x, y, xOff, yOff] = rectangleAttempt;
        const newRectXMax = x + xOff;
        const newRectYMax = y + yOff;
        for (let i = 0; i < coordsArray.length; i++){
            const oldRectXMin = coordsArray[i][2];
            const oldRectYMin = coordsArray[i][3];
            const oldRectXMax = coordsArray[i][0] + oldRectXMin;
            const oldRectYMax = coordsArray[i][1] + oldRectYMin;
            if (newRectXMax + ROOM_SEPARATION_MIN > oldRectXMin && xOff - ROOM_SEPARATION_MIN < oldRectXMax){
                if (newRectYMax + ROOM_SEPARATION_MIN > oldRectYMin && yOff - ROOM_SEPARATION_MIN < oldRectYMax) return true;
            }
        }
        return false;
    }

    // Create coordinates and rectangles for the rooms.
    // Attempts will create 'density'
    function createRectangleCoords(gridLength, attempts){
        const ROOM_COORD_MIN = 3;
        const ROOM_COORD_MAX = 11;
        const coord = () => Math.floor(Math.random() * (ROOM_COORD_MAX - ROOM_COORD_MIN)) + ROOM_COORD_MIN;
        const offset = (coord) => Math.floor(Math.random() * (gridLength  - coord + 1));
        let coordsArray = [];
        for (let i = 0; i < attempts; i++){
            let rectangleAttempt = [coord(), coord()];
            let rectangleOffsets = [offset(rectangleAttempt[0]), offset(rectangleAttempt[1])];
            rectangleAttempt = rectangleAttempt.concat(rectangleOffsets);
            let isOverlapping = checkBounds(coordsArray, rectangleAttempt);
            if (!isOverlapping) coordsArray.push(rectangleAttempt);
        }
        return coordsArray;
    }
  

    // Create all rectangles from coords and put into same array.
        function addRectanglesFromCoords(coordsArray, grid){
            let newGrid = createRectangle(coordsArray[0], grid);
            let i = 1;
            while (i < coordsArray.length){
                newGrid = createRectangle(coordsArray[i], newGrid);
                i++;
            }
            return newGrid;
        }
    // Create points within each room to tunnel to/from
        function getTunnelPoints(coordsArray){
            let returnArr = [...coordsArray];
            returnArr = returnArr.map(coords => {
                return [
                    Math.ceil(Math.random() * coords[1]) + coords[3] - 1,
                    Math.ceil(Math.random() * coords[0]) + coords[2] - 1,
                ]
            })
            return returnArr;
        }
    // Creates tunnels from point to point
        function createTunnels(tunnelPoints, grid){
            // sorting by y will prefer vertical hallways
            // sorting by x will prefer horizontal hallways
            // not sorting will show no preference

            let sortedPoints = tunnelPoints;
            let returnGrid = [...grid];

            for (let i = 0; i < sortedPoints.length; i++){
                let [x, y] = sortedPoints[i];
                let xTo, yTo;
                if (i < sortedPoints.length - 1){
                    [xTo, yTo] = sortedPoints[i + 1];
                } else{
                    [xTo, yTo] = sortedPoints[0];
                }
                let innerArray = [...returnGrid[y]]
                
                if (xTo >= x){
                    for (let j = x; j < xTo; j++){
                        innerArray[j] = 'x';
                    }
                    returnGrid[y] = innerArray;
                }
                else if (xTo < x){
                    for (let j = x; j > xTo; j--){
                        innerArray[j] = 'x';
                    }
                    returnGrid[y] = innerArray;
                }
         
                if (yTo >= y){
                    for (let j = y; j < yTo; j++){
                        let yArray = [...returnGrid[j]];
                        yArray[xTo] = 'x';
                        returnGrid[j] = yArray;
                    }
                }
                else if (yTo < y){
                    for (let j = y; j > yTo; j--){
                        let yArray = [...returnGrid[j]];
                        yArray[xTo] = 'x';
                        returnGrid[j] = yArray;
                    }
                }
            }
            return returnGrid;
        }

        // execute room creation and tunneling
        let rects = createRectangleCoords(newGrid.length, 25);
        let tunnelPoints = getTunnelPoints(rects);
        let fullGrid = createTunnels(tunnelPoints, newGrid);
        fullGrid = addRectanglesFromCoords(rects, fullGrid);
        return[fullGrid, tunnelPoints[0]];
}


