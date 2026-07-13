const cron = require("node-cron");

const Flight = require("../models/Flight");
const fetchFlightsFromOpenSky = require("../services/openSkyService");

const startFlightScheduler = () => {
  // Every 15 minutes
  cron.schedule("*/1 * * * *", async () => {
    console.log("=======================================");
    console.log("Fetching latest flight data...");
    console.log(new Date());

    try {
      const flights = await fetchFlightsFromOpenSky();

      if (flights.length > 0) {
        await Flight.insertMany(flights);

        console.log(`✅ ${flights.length} flights saved successfully.`);
      } else {
        console.log("No flight data received.");
      }
    } catch (error) {
      console.error("Scheduler Error:", error.message);
    }

    console.log("=======================================");
  });

  console.log("✅ Flight Scheduler Started (Every 15 Minutes)");
};

module.exports = startFlightScheduler;