import {getData} from '../Api';
import {AsyncStorage} from 'react-native';

const initialState = {
    data : [],
    msg : "helllo"
}

export function reducer(state = initialState,action){
    console.log(action);
    switch(action.type){
        case "FETCH":
            console.log(action);
            return {
                ...state,
                data : action.data
            }
        break;
        case 'msg':
            AsyncStorage.getItem('token',(token) => {
                getData(token,(res) => {
                    return {
                        ...state,
                        data : res
                    }
                })
            })
        default:
            return state;
        break
    }
} 