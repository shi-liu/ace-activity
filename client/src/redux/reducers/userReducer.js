import { SET_USER, SET_AUTH, SET_UNAUTH } from '../types';

const initalState = {
    authenticated: false,
    credentials: {},
};

export default function( state = initalState, action ){
    switch(action.type){
        case SET_AUTH:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTH:
            return initalState;
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            };
        default: return state;
    }
}