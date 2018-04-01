import { createReducer, set } from "~/util";

const INIT_STATE = {
  status: "UNLOADED",
  routes: [],
  stations: []
};
const LOADING_STATE = set("status", "LOADING", INIT_STATE);

export default createReducer(
  {
    INITIALIZE_BACK_TRACKER: () => LOADING_STATE,
    RECEIVE_ROUTES: set("routes"),
    RECEIVE_STATIONS: set("stations"),
    SET_STATUS: set("status")
  },
  INIT_STATE
);
