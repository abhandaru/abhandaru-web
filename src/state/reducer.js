import * as Types from './types'
import { combineReducers } from 'redux'

const INITIAL = {
  // seed: Math.random(),
  seed: 7,
  size: 20
};

const landing = (state = INITIAL, action) => {
  switch (action.type) {
    case Types.SEED_NEXT:
      return { ...state, seed: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  landing
});
