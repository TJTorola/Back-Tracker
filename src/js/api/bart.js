import { set } from "~/util";

// DOCS: http://api.bart.gov/docs/overview/index.aspx

const UNIVERSAL_PARAMS = {
  json: "y",
  key: "MW9S-E7SL-26DU-VV8V"
};

const PARAM_MAP = {
  routeNumber: "route",
  scheduleNumber: "sched"
};

const generateUrl = (root, command, addedParams = {}) => {
  const mappedParams = Object.keys(addedParams).reduce(
    (acc, p) => Object.assign({}, acc, { [PARAM_MAP[p] || p]: addedParams[p] }),
    {}
  );

  const params = Object.assign(
    { cmd: command },
    UNIVERSAL_PARAMS,
    mappedParams
  );

  const paramString = Object.keys(params)
    .map(p => `${p}=${params[p]}`)
    .join("&");

  return `//api.bart.gov/api/${root}.aspx?${paramString}`;
};

const API = [
  {
    command: "count",
    mapResponse: ({ root }) => ({
      trainCount: parseInt(root.traincount)
    }),
    methodName: "trainCount",
    root: "bsa"
  },
  {
    command: "bsa",
    mapResponse: ({ root }) => ({
      advisories: root.bsa.map(
        ({ description }) => description["#cdata-section"]
      )
    }),
    methodName: "serviceAdvisory",
    root: "bsa"
  },
  {
    command: "elev",
    mapResponse: console.log,
    methodName: "elevatorInformation",
    root: "bsa"
  },
  {
    command: "etd",
    mapResponse: console.log,
    methodName: "departureEstimate",
    root: "etd"
  },
  {
    command: "routeInfo",
    mapResponse: ({ root }) => ({
      route: root.routes.route
    }),
    methodName: "route",
    root: "route"
  },
  {
    command: "routes",
    mapResponse: ({ root }) => ({
      routes: root.routes.route.map(r => ({
        abbreviation: r.abbr,
        hexColor: r.hexcolor,
        name: r.name,
        routeId: r.routeID,
        routeNumber: r.number
      })),
      scheduleNumber: root.sched_num
    }),
    methodName: "routes",
    root: "route"
  },
  {
    command: "stns",
    mapResponse: ({ root }) => ({
      stations: root.stations.station.map(s => ({
        abbreviation: s.abbr,
        address: {
          city: s.city,
          county: s.county,
          latitude: s.gtfs_latitude,
          longitude: s.gtfs_longitude,
          state: s.state,
          street: s.address,
          zipCode: s.zipcode
        },
        name: s.name
      }))
    }),
    methodName: "stations",
    root: "stn"
  }
];

const Bart = API.reduce(
  (acc, { methodName, root, command, mapResponse, requiredParams }) => {
    const apiMethod = async params => {
      const response = await fetch(generateUrl(root, command, params));
      const parsedResponse = await response.json();
      return mapResponse(parsedResponse);
    };

    return set(methodName, apiMethod, acc);
  },
  {}
);

export default Bart;
