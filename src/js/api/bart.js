// DOCS: http://api.bart.gov/docs/overview/index.aspx

/**
 * ADVISORIES:
 * - bsa (Bart service advisory)
 *   http://api.bart.gov/docs/bsa/bsa.aspx
 *   orig?: StationAbbr = 'ALL'
 *
 * - count (Trains active in system)
 *   http://api.bart.gov/docs/bsa/count.aspx
 *
 * - elev (Elevator information)
 *   http://api.bart.gov/docs/bsa/elev.aspx
 *
 * ESTIMATES
 * - etd (Estimated time to depart)
 *   http://api.bart.gov/docs/etd/etd.aspx
 *   orig: StationAbbr | 'ALL'
 *   plat?: PlatformNum
 *   dir?: 'n' | 's'
 *
 * ROUTE INTROSPECTION
 * - routeinfo
 *   http://api.bart.gov/docs/route/routeinfo.aspx
 *   route: RouteNum | 'ALL'
 *   sched?: ScheduleNum
 *   date?: <mm/dd/yyyy> | 'NOW' | 'TODAY'
 *
 * - routes
 *   http://api.bart.gov/docs/route/routes.aspx
 *   sched?: ScheduleNum
 *   date?: <mm/dd/yyyy> | 'NOW' | 'TODAY'
 */

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
