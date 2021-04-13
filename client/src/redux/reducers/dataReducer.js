import { LOADING_DATA, POST_ACTIVITY } from '../types';
import { SET_ACTIVITIES } from '../types';
import { DELETE_ACTIVITY, CLEAR_ACTIVITIES } from '../types';

const initState = {
    activities: [],
    loading: false
};

export default function(state = initState, action){
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
                loading: false
            };
        case DELETE_ACTIVITY:
            let index = state.activities.findIndex(
                (activity) => activity.activityId == action.payload
            );
            state.activities.splice(index, 1);
            return {
                ...state
            };
        case CLEAR_ACTIVITIES:
            return {
                initState
            }
        case POST_ACTIVITY:
            return {
                ...state,
                activities: [action.payload, ...state.activities]
            };
        default:
            return state;
    }
}