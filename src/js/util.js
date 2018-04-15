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

export const setFrom = curry(
  (setField, fromField, value, state) =>
    value[fromField] !== undefined
      ? Object.assign({}, state, { [setField]: value[fromField] })
      : state
);

/**
 * This applies arguments to an array of functions progressively.
 * The final argument will be replaced by the return values of the functions.
 *
 * Important: The functions must all have the same arity in order for this to work.
 */
export const pipe = functions => (...args) => {
  const [head, ...tail] = functions;
  const testResult = head(...args);
  const initialArgs = args.slice(0, -1);
  return typeof testResult === "function"
    ? pipe([testResult, ...tail.map(f => f(...args))])
    : tail.reduce((acc, f) => f(...initialArgs, acc), testResult);
};
