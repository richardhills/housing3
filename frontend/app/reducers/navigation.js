import { Map } from 'immutable';

export default function state(state = {}, action) {
  switch (action.type) {
    case "VIEW_NAVIGATION":
      return state.mergeDeep(action.viewDelta);
    default:
      return state;
  }
}
