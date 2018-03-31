// DOCS: http://api.bart.gov/docs/overview/index.aspx

// This is the public token
const BASE_URL = `http://api.bart.gov/api/`;
const UNIVERSAL_PARAMS = {
  key: "MW9S-E7SL-26DU-VV8V",
  json: "y"
};

const generateUrl = (root, command, addedParams = {}) => {
  const params = Object.assign({}, UNIVERSAL_PARAMS, addedParams);
  const paramString = Object.keys(params)
    .map(p => `${p}=${params[p]}`)
    .join("&");

  return `http://api.bart.gov/api/${root}.aspx?cmd=${command}&${paramString}`;
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
    mapResponse: console.log
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
  (acc, { name, root, command, mapResponse }) =>
    Object.assign({}, acc, {
      [name]: params =>
        fetch(generateUrl(root, command, params))
          .then(response => response.json())
          .then(parsedResponse => mapResponse(parsedResponse))
    }),
  {}
);

export default Bart;
