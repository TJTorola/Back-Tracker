import curry from "ramda/src/curry";

export const createThunk = (type, thunk) => data => (dispatch, getState) => {
  dispatch({ type, data });
  return thunk(data)({ getState, dispatch });
};

export const createAction = type => data => ({ type, data });

export const createReducer = (actionMap, initialState) => (
  state = initialState,
  action
) =>
  actionMap[action.type] ? actionMap[action.type](action.data, state) : state;

export const set = curry((field, value, state) =>
  Object.assign({}, state, { [field]: value })
);
