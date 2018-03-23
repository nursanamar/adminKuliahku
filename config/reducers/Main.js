import {getData} from '../Api';
import {AsyncStorage} from 'react-native';

const initialState = {
    data : {
        today : [],
        tomorrow : []
    },
    isLoading : true
}

export function reducer(state = initialState,action){
    switch(action.type){
        case "FETCH":
            return {
                data : action.data,
                isLoading : false
            }
        break;
        case 'LOADING':
            return {
                ...state,
                isLoading : true
            }
        default:
            return state;
        break
    }
} 