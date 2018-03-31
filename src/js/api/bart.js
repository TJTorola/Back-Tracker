// DOCS: http://api.bart.gov/docs/overview/index.aspx

const UNIVERSAL_PARAMS = {
  key: "MW9S-E7SL-26DU-VV8V",
  json: "y"
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
    name: "trainCount",
    root: "bsa",
    command: "count",
    mapResponse: ({ root }) => ({
      trainCount: parseInt(root.traincount)
    })
  },
  {
    name: "serviceAdvisory",
    root: "bsa",
    command: "bsa",
    mapResponse: ({ root }) => ({
      advisories: root.bsa.map(
        ({ description }) => description["#cdata-section"]
      )
    })
  },
  {
    name: "elevatorInformation",
    root: "bsa",
    command: "elev",
    mapResponse: console.log
  },
  {
    name: "departureEstimate",
    root: "etd",
    command: "etd",
    mapResponse: console.log
  },
  {
    name: "route",
    root: "route",
    command: "routeInfo",
    mapResponse: ({ root }) => ({
      route: root.routes.route
    })
  },
  {
    name: "routes",
    root: "route",
    command: "routes",
    mapResponse: ({ root }) => ({
      routes: root.routes.route.map(r => ({
        name: r.name,
        routeId: r.routeID,
        abbreviation: r.abbr,
        hexColor: r.hexcolor,
        routeNumber: r.number
      })),
      scheduleNumber: root.sched_num
    })
  },
  {
    name: "stations",
    root: "stn",
    command: "stns",
    mapResponse: ({ root }) => ({
      stations: root.stations.station.map(s => ({
        name: s.name,
        abbreviation: s.abbr,
        address: {
          city: s.city,
          street: s.address,
          zipCode: s.zipcode,
          state: s.state,
          county: s.county,
          latitude: s.gtfs_latitude,
          longitude: s.gtfs_longitude
        }
      })),
      scheduleNumber: root.sched_num
    })
  }
];

const Bart = API.reduce(
  (acc, { name, root, command, mapResponse, requiredParams }) => {
    const apiMethod = async params => {
      const response = await fetch(generateUrl(root, command, params));
      const parsedResponse = await response.json();
      return mapResponse(parsedResponse);
    };

    return Object.assign({}, acc, { [name]: apiMethod });
  },
  {}
);

export default Bart;
