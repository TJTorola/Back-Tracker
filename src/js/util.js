import curry from "ramda/src/curry";

export const createAction = (type, thunk) => data => {
  const action = { type, data };

  if (!thunk) return action;
  return (dispatch, getState) => {
    dispatch(action);
    return thunk(data)({ getState, dispatch });
  };
};

export const createReducer = (actionMap, initialState) => (
  state = initialState,
  action
) =>
  actionMap[action.type] ? actionMap[action.type](action.data, state) : state;

export const pipe = functions => (...args) => {
  const [head, ...tail] = functions;
  const testResult = head(...args);
  const initialArgs = args.slice(0, -1);
  return typeof testResult === "function"
    ? pipe([testResult, ...tail.map(f => f(...args))])
    : tail.reduce((acc, f) => f(...initialArgs, acc), testResult);
};

export const set = curry((field, value, state) =>
  Object.assign({}, state, { [field]: value })
);

export const setFrom = curry(
  (setField, fromField, value, state) =>
    value[fromField] !== undefined
      ? Object.assign({}, state, { [setField]: value[fromField] })
      : state
);
