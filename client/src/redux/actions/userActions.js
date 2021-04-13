import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTH, LOADING_USER, CLEAR_ACTIVITIES } from '../types';

export const userRegister = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/register', userData)
  .then((res) => {
   // setAuthHeader(res.data.token);
    dispatch(getUserData());
    //dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  })
  .catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });
};

export const userLogin = (creds, history) => (dispatch) => {
    dispatch({type: LOADING_UI });
    axios.post('/login', creds)
    .then(res => {
        //setAuthHeader(res.data.token)
        dispatch(getUserData());
        history.push("/");
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        }) 
    });
}

export const userLogout = () => (dispatch) => {
    axios.post('/logout')
    .then((res) => {
      dispatch({ type: SET_UNAUTH });
      dispatch({ type: CLEAR_ACTIVITIES })
    })
    .catch((err) => {
      console.log(err)
    })

}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get('/user')
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .then((res) => {
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => console.log('Cannot get user data ' + err));
  };

