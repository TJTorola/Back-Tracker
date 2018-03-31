// DOCS: http://api.bart.gov/docs/overview/index.aspx

// This is the public token
const API_TOKEN = "MW9S-E7SL-26DU-VV8V";
const BASE_URL = `http://api.bart.gov/api/route.aspx?key=${API_TOKEN}&json=y`;

const generateUrl = (base, command, params = {}) => {
  const paramString = Object.keys(params)
    .map(p => `${p}=${params[p]}`)
    .join("&");
  const andParams = paramString ? `&${paramString}` : "";

  return `http://api.bart.gov/api/${base}.aspx?key=${API_TOKEN}&json=y&cmd=${command}${andParams}`;
};

const Bart = {
  trainCount: () => fetch(generateUrl("bsa", "count"))
};

export default Bart;
