export default function navigate(viewDelta) {
  const action = {
    type: "VIEW_NAVIGATION",
    viewDelta: viewDelta
  };
  return action;
}
