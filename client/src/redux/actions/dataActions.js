import axios from 'axios';
import { CLEAR_ERRORS, DELETE_ACTIVITY, 
     POST_ACTIVITY, SET_ERRORS, LOADING_DATA, SET_ACTIVITIES } from '../types';

export const postActivity = newActivity => dispatch => {
    axios.post("/activity", newActivity)
    .then((res) => {
        dispatch({ type: POST_ACTIVITY,
        payload: res.data });
        dispatch({ type: CLEAR_ERRORS});
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response
        })
    })
}; 

export const deleteActivity = activityID => dispatch => {
    axios.delete(`/activity/${activityID}`)
    .then(() => {
        dispatch({type: DELETE_ACTIVITY, payload: activityID });
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getActivities = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/activities')
    .then(res => {
        dispatch({
            type: SET_ACTIVITIES,
            payload: res.data
        });
    })
    .catch(err => console.log(err));
};