const Flight = require("../models/Flight");
const fetchFlightsFromOpenSky = require("../services/openSkyService");

// Fetch and save flights
const fetchAndSaveFlights = async (req, res) => {
    try {
        // Fetch latest flights from OpenSky
        const flights = await fetchFlightsFromOpenSky();

        if (flights.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No flight data received from OpenSky."
            });
        }

        // Save all flights as a new snapshot
        await Flight.insertMany(flights);

        return res.status(200).json({
            success: true,
            message: "Flight data saved successfully.",
            totalFlightsFetched: flights.length
        });

    } catch (error) {
        console.error("Error saving flights:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Latest snapshot
const getLatestFlights = async (req, res) => {
    try {

        const latestFlight = await Flight
            .findOne()
            .sort({ timestamp: -1 });

        if (!latestFlight) {
            return res.status(404).json({
                success: false,
                message: "No flight data found."
            });
        }

        const latestSnapshotId = latestFlight.snapshotId;

        const flights = await Flight.find({
            snapshotId: latestSnapshotId
        });

        res.status(200).json({
            success: true,
            snapshotId: latestSnapshotId,
            totalFlights: flights.length,
            data: flights
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Dashboard statistics
const getFlightStatistics = async (req, res) => {
    try {

        // Find the latest snapshot
        const latestFlight = await Flight.findOne().sort({ timestamp: -1 });

        if (!latestFlight) {
            return res.status(404).json({
                success: false,
                message: "No flight data found."
            });
        }

        const latestSnapshotId = latestFlight.snapshotId;

        // Get all flights from the latest snapshot
        const flights = await Flight.find({
            snapshotId: latestSnapshotId
        });

        const totalFlights = flights.length;

        const flightsInAir = flights.filter(f => !f.onGround).length;

        const flightsOnGround = flights.filter(f => f.onGround).length;

        const altitudeFlights = flights.filter(f => f.altitude !== null);

        const averageAltitude =
            altitudeFlights.length > 0
                ? altitudeFlights.reduce((sum, f) => sum + f.altitude, 0) / altitudeFlights.length
                : 0;

        const speedFlights = flights.filter(f => f.velocity !== null);

        const averageSpeed =
            speedFlights.length > 0
                ? speedFlights.reduce((sum, f) => sum + f.velocity, 0) / speedFlights.length
                : 0;
        const highestAltitude =
            altitudeFlights.length > 0
                ? Math.max(...altitudeFlights.map(f => f.altitude))
                : 0;

        const highestSpeed =
            speedFlights.length > 0
                ? Math.max(...speedFlights.map(f => f.velocity))
                : 0;

        const countries = [...new Set(flights.map(f => f.originCountry))];

        return res.status(200).json({
            success: true,
            snapshotId: latestSnapshotId,
            statistics: {
                totalFlights,
                flightsInAir,
                flightsOnGround,
                averageAltitude: Number(averageAltitude.toFixed(2)),
                averageSpeed: Number(averageSpeed.toFixed(2)),
                highestAltitude,
                highestSpeed,
                totalCountries: countries.length
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Flight history
const getFlightHistory = async (req, res) => {
    try {

        const { callsign } = req.params;

        if (!callsign) {
            return res.status(400).json({
                success: false,
                message: "Callsign is required."
            });
        }

        const history = await Flight.find({
            callsign: callsign.trim().toUpperCase()
        })
        .sort({ timestamp: 1 });

        if (history.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No history found for this flight."
            });
        }

        return res.status(200).json({
            success: true,
            totalSnapshots: history.length,
            history
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Search flight
const searchFlight = async (req, res) => {
    try {

        const { callsign } = req.query;

        if (!callsign) {
            return res.status(400).json({
                success: false,
                message: "Callsign is required."
            });
        }

        // Find latest snapshot
        const latestFlight = await Flight.findOne().sort({ timestamp: -1 });

        if (!latestFlight) {
            return res.status(404).json({
                success: false,
                message: "No flight data found."
            });
        }

        const latestSnapshotId = latestFlight.snapshotId;

        // Search flight in latest snapshot
        const flight = await Flight.findOne({
            snapshotId: latestSnapshotId,
            callsign: callsign.trim().toUpperCase()
        });

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: "Flight not found."
            });
        }

        return res.status(200).json({
            success: true,
            flight
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    fetchAndSaveFlights,
    getLatestFlights,
    getFlightStatistics,
    getFlightHistory,
    searchFlight
};