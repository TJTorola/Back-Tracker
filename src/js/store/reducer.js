import { createReducer } from "~/util";

const INIT_STATE = {};

export default createReducer(
  {
    RECEIVE_ROUTES: ({ action }) => action.data.routes
  },
  INIT_STATE
);
