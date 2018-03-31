export const createThunk = (type, thunk) => data => (dispatch, getState) => {
  dispatch({ type, data });
  return thunk(data)({ getState, dispatch });
};

export const createAction = type => data => ({ type, data });
