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
    mapResponse: console.log
  },
  {
    name: "serviceAdvisory",
    root: "bsa",
    command: "bsa",
    mapResponse: console.log
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
      routes: root.routes.route,
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
