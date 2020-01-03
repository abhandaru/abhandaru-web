import * as Types from './types'

const createAction = (type, payload) => ({ type, payload });

export const seedNext = (seed) =>
  createAction(Types.SEED_NEXT, seed);
