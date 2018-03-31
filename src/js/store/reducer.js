import lensProp from "ramda/src/lensProp";
import set from "ramda/src/set";

import { createReducer } from "~/util";

const INIT_STATE = {
  status: "UNLOADED",
  routes: [],
  stations: []
};
const LOADING_STATE = set(lensProp("status"), "LOADING", INIT_STATE);

export default createReducer(
  {
    INITIALIZE_BACK_TRACKER: () => LOADING_STATE,
    RECEIVE_ROUTES: set(lensProp("routes")),
    RECEIVE_STATIONS: set(lensProp("stations")),
    SET_STATUS: set(lensProp("status"))
  },
  INIT_STATE
);
