const dotenv = require("dotenv");
const fetchFlightsFromOpenSky = require("./services/openSkyService");

dotenv.config();

(async () => {
  const flights = await fetchFlightsFromOpenSky();

  console.log("Total Flights:", flights.length);

  console.log(flights.slice(0, 5));
})();