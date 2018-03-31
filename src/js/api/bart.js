// DOCS: http://api.bart.gov/docs/overview/index.aspx

// This is the public token
const BASE_URL = `http://api.bart.gov/api/`;
const UNIVERSAL_PARAMS = {
  key: "MW9S-E7SL-26DU-VV8V",
  json: "y"
};

const generateUrl = (base, command, addedParams = {}) => {
  const params = Object.assign({}, UNIVERSAL_PARAMS, addedParams);
  const paramString = Object.keys(params)
    .map(p => `${p}=${params[p]}`)
    .join("&");

  return `http://api.bart.gov/api/${base}.aspx?cmd=${command}&${paramString}`;
};

const Bart = {
  trainCount: () => fetch(generateUrl("bsa", "count"))
};

export default Bart;
