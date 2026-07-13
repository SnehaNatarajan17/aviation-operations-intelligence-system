const express = require("express");
const router = express.Router();
const {
    fetchAndSaveFlights,
    getLatestFlights,
    getFlightStatistics,
    searchFlight,
    getFlightHistory
} = require("../controllers/flightController");

router.get("/fetch", fetchAndSaveFlights);
router.get("/latest", getLatestFlights);
router.get("/statistics", getFlightStatistics);
router.get("/search", searchFlight);
router.get("/history/:callsign", getFlightHistory);

module.exports = router;