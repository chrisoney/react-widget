import { csrfFetch } from './csrf';

const SET_SESSION_USER = 'session/setSessionUser';
const REMOVE_SESSION_USER = 'session/removeSessionUser';

const setUser = (user) => {
  return {
    type: SET_SESSION_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_SESSION_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SESSION_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_SESSION_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;