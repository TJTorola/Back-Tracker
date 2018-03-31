import Bart from "~/api/bart";
import { createThunk, createAction } from "~/util";

export const requestRoutes = createAction("REQUEST_ROUTES");
export const receiveRoutes = createAction("RECEIVE_ROUTES");

export const initialize = createThunk(
  "INITIALIZE_BACK_TRACKER",
  () => async ({ getState, dispatch }) => {
    dispatch(requestRoutes());
    dispatch(receiveRoutes(await Bart.routes()));
  }
);
