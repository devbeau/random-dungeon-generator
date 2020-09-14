import {init} from './App';
export const initialPosition = {x: 24, y: 24};

export function reducer(state, action){
    switch (action.type){
        case '37': 
            if (action.payload.has(`${state.x},${state.y -1}`)){
                return {...state, y: state.y - 1 }
            }
            else return state;
        case '38':
            if (action.payload.has(`${state.x - 1},${state.y}`)){ 
                return {...state, x: state.x - 1 }
            }
            else return state;
        case '39':
            if (action.payload.has(`${state.x},${state.y + 1}`)){  
                return {...state, y: state.y + 1 }
            }
            else return state;
        case '40':
            if (action.payload.has(`${state.x + 1},${state.y}`)){   
               return {...state, x: state.x + 1 }
            }
            else return state;
        case 'RESET':
                return init(action.payload);
        default:
            return state;
    }    
}