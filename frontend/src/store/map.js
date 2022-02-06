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

const removeMaps = (id) => ({
  type: REMOVE_MAP,
  payload: id
});

const initialState = { 
  maps: null
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