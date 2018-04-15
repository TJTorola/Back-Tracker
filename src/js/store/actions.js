import lazyLoadCSS from "lazyload-css";

import Bart from "~/api/bart";
import { createThunk, createAction } from "~/util";

export const receiveRoutes = createAction("RECEIVE_ROUTES");
export const receiveStations = createAction("RECEIVE_STATIONS");
export const setStatus = createAction("SET_STATUS");

export const fetchPlan = createThunk("FETCH_PLAN", plan => async () => {});

export const initialize = createThunk(
  "INITIALIZE_BACK_TRACKER",
  () => async ({ getState, dispatch }) => {
    await Promise.all([
      dispatch(requestRoutes()),
      dispatch(requestStations()),
      lazyLoadCSS("main.css", "main")
    ]);

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

export const setStations = createThunk(
  "SET_STATIONS",
  () => ({ getState, dispatch }) => {
    const { toStation, fromStation } = getState();
    if (toStation && fromStation) {
      dispatch(fetchPlan(`${fromStation}->${toStation}`));
    }
  }
);

export const swapStations = createThunk(
  "SWAP_STATIONS",
  () => ({ dispatch, getState }) => {
    const { toStation, fromStation } = getState();
    dispatch(
      setStations({
        to: fromStation,
        from: toStation
      })
    );
  }
);
