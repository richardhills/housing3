import { Map, List } from 'immutable';

export default function state(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case "ADD_NEW_ROAD":
      return state.push(Map({
        type: "road",
        path: List(action.path)
      }));
    case "MODIFY_ROAD":
      return state.set(action.roadId, state.get(action.roadId).merge({
        path: List(action.path)
      }));
    default:
      return state;
  }
}
