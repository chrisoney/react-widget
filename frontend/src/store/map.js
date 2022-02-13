import { csrfFetch } from './csrf';

const ADD_MAP = 'map/addMap';
const ADD_MAPS = 'map/addMaps';
const REMOVE_MAP = 'map/removeMap';

const getMap = (map) => ({
  type: ADD_MAP,
  payload: map
});

const getMaps = (maps) => ({
  type: ADD_MAPS,
  payload: maps
});

const removeMap = (id) => ({
  type: REMOVE_MAP,
  payload: id
});

export const fetchAllMaps = () => async (dispatch) => {
  const res = await csrfFetch(('/api/maps'));

  const data = await res.json();

  dispatch(getMaps(data.maps));

  return res;
}

export const createMap = (startingAttrs, userId) => async (dispatch) => {
  const res = await csrfFetch('/api/maps', {
    method: 'POST',
    body: JSON.stringify({ startingAttrs, userId })
  });

  const data = await res.json();

  dispatch(getMap(data.map));

  return res;
}

export const deleteMap = (mapId) => async (dispatch) => {
  const res = await csrfFetch(`/api/maps/${mapId}`, {
    method: 'DELETE'
  });

  const data = await res.json();

  dispatch(removeMap(data.id));
  
  return res;
}

export const editMap = (mapId, hexagons, startingAttrs) => async (dispatch) => {
  const res = await csrfFetch(`/api/maps/${mapId}`, {
    method: 'PUT',
    body: JSON.stringify({ hexagons, startingAttrs })
  });

  const data = await res.json();

  dispatch(getMap(data.map));
  
  return res;
}

const initialState = { 
  maps: []
};

const mapsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_MAP:
      const map = action.payload;
      newState = Object.assign({}, state);
      newState.maps[map.id] = map;
      return newState;
    case ADD_MAPS:
      const maps = action.payload;
      newState = Object.assign({}, state);
      maps.forEach((map) => {
        newState[map.id] = map;
      })
      return newState;
    case REMOVE_MAP:
      newState = Object.assign({}, state);
      delete newState.maps[map.id];
      return newState;
    default:
      return state;
  }
};

export default mapsReducer;