import * as Types from './types'
import { combineReducers } from 'redux'

const INITIAL = {
  seed: Math.random()
};

const core = (state = INITIAL, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  core
});
