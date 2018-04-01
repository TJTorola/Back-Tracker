import { createReducer, set } from "~/util";

const INIT_STATE = {
  fromStation: null,
  routes: [],
  stations: [],
  status: "UNLOADED",
  toStation: null
};
const LOADING_STATE = set("status", "LOADING", INIT_STATE);

export default createReducer(
  {
    INITIALIZE_BACK_TRACKER: () => LOADING_STATE,
    RECEIVE_ROUTES: set("routes"),
    RECEIVE_STATIONS: set("stations"),
    SET_FROM_STATION: set("fromStation"),
    SET_STATUS: set("status"),
    SET_TO_STATION: set("toStation")
  },
  INIT_STATE
);
