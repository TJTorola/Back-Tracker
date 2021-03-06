import lazyLoadCSS from "lazyload-css";

import Bart, { findRoute } from "~/api/bart";
import { createAction } from "~/util";

export const receiveRoutes = createAction("RECEIVE_ROUTES");
export const receiveStations = createAction("RECEIVE_STATIONS");
export const setStatus = createAction("SET_STATUS");
export const initPlan = createAction("INIT_PLAN");

export const fetchPlan = createAction(
  "FETCH_PLAN",
  ({ to, from }) => async ({ getState, dispatch }) => {
    const { routes } = getState();
    const route = findRoute({ to, from }, routes);
    const currentIdx = route.stations.indexOf(from);
    const backStations = [currentIdx - 1, currentIdx - 2, currentIdx - 3]
      .filter(idx => idx >= 0)
      .map(idx => route.stations[idx]);

    dispatch(
      initPlan({
        backStations,
        from,
        key: `${from}->${to}`,
        route,
        to
      })
    );
  }
);

export const initialize = createAction(
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

export const requestRoutes = createAction(
  "REQUEST_ROUTES",
  () => async ({ dispatch }) => {
    const { routes: routeIndex } = await Bart.routes();
    const routePs = routeIndex.map(r => Bart.route({ route: r.routeNumber }));
    const routes = await Promise.all(routePs);
    dispatch(receiveRoutes(routes));
  }
);

export const requestStations = createAction(
  "REQUEST_STATIONS",
  () => async ({ dispatch }) => {
    const { stations } = await Bart.stations();
    dispatch(receiveStations(stations));
  }
);

export const setStations = createAction(
  "SET_STATIONS",
  () => ({ getState, dispatch }) => {
    const { toStation, fromStation } = getState();
    if (toStation && fromStation) {
      dispatch(fetchPlan({ to: toStation, from: fromStation }));
    }
  }
);

export const swapStations = createAction(
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
