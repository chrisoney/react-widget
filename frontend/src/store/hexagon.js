const SET_HEX_ATTR = 'hexagon/setHexAttr';

export const setAttr = (attr) => {
  return {
    type: SET_HEX_ATTR,
    payload: attr,
  };
};


const initialState = { 
  attributes: {
    color: 'blue',
    image: null
  } 
};

const hexagonReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_HEX_ATTR:
      const { type, value } = action.payload
      newState = Object.assign({}, state);
      newState.attributes[type] = value;
      return newState;
    default:
      return state;
  }
};

export default hexagonReducer;