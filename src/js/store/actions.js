import Bart from "~/api/bart";
import { createThunk, createAction } from "~/util";

export const receiveRoutes = createAction("RECEIVE_ROUTES");
export const receiveStations = createAction("RECEIVE_STATIONS");
export const setFromStation = createAction("SET_FROM_STATION");
export const setStatus = createAction("SET_STATUS");
export const setToStation = createAction("SET_TO_STATION");

export const initialize = createThunk(
  "INITIALIZE_BACK_TRACKER",
  () => async ({ getState, dispatch }) => {
    await Promise.all([dispatch(requestRoutes()), dispatch(requestStations())]);

    dispatch(setStatus("LOADED"));
  }
);

export const requestRoutes = createThunk(
  "REQUEST_ROUTES",
  () => async ({ dispatch }) => {
    const { routes } = await Bart.routes();
    dispatch(receiveRoutes(routes));
  }
);

export const requestStations = createThunk(
  "REQUEST_STATIONS",
  () => async ({ dispatch }) => {
    const { stations } = await Bart.stations();
    dispatch(receiveStations(stations));
  }
);
