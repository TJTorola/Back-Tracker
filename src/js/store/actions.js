import Bart from "~/api/bart";
import { createThunk, createAction } from "~/util";

export const receiveRoutes = createAction("RECEIVE_ROUTES");
export const requestRoutes = createAction("REQUEST_ROUTES");
export const setStatus = createAction("SET_STATUS");

export const initialize = createThunk(
  "INITIALIZE_BACK_TRACKER",
  () => async ({ getState, dispatch }) => {
    dispatch(requestRoutes());
    const { routes } = await Bart.routes();
    dispatch(receiveRoutes(routes));
    dispatch(setStatus("LOADED"));
  }
);
