export function addNewRoad(path) {
  const action = {
    type: "ADD_NEW_ROAD",
    path: path
  };
  return action;
}

export function modifyRoad(roadId, path) {
  return {
    type: "MODIFY_ROAD",
    roadId: roadId,
    path: path
  }
}
