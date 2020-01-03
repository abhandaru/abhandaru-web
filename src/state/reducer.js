import * as Types from './types'
import { combineReducers } from 'redux'

const INITIAL = {
  seed: Math.random(),
  size: 20
};

const landing = (state = INITIAL, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  landing
});
