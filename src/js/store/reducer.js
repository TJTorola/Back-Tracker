import { createReducer, set } from "~/util";

const INIT_STATE = {
  status: "UNLOADED",
  routes: [],
  stations: [],
  toStation: null,
  fromStation: null
};
const LOADING_STATE = set("status", "LOADING", INIT_STATE);

export default createReducer(
  {
    INITIALIZE_BACK_TRACKER: () => LOADING_STATE,
    RECEIVE_ROUTES: set("routes"),
    RECEIVE_STATIONS: set("stations"),
    SET_STATUS: set("status"),
    SET_TO_STATION: set("toStation"),
    SET_FROM_STATION: set("fromStation")
  },
  INIT_STATE
);
