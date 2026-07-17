const Flight = require("../models/Flight");
const askGemini = require("../services/geminiService");

const chatWithAI = async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required."
            });
        }

        // Latest snapshot
        const latestFlight = await Flight.findOne().sort({
            timestamp: -1
        });

        if (!latestFlight) {
            return res.status(404).json({
                success: false,
                message: "No flight data found."
            });
        }

        // Flights from latest snapshot
        const flights = await Flight.find({
            snapshotId: latestFlight.snapshotId
        });

        // Statistics
        const totalFlights = flights.length;

        const flightsInAir = flights.filter(
            flight => !flight.onGround
        ).length;

        const flightsOnGround = flights.filter(
            flight => flight.onGround
        ).length;

        const averageAltitude =
            flights
                .filter(f => f.altitude)
                .reduce((sum, f) => sum + f.altitude, 0) /
            flights.filter(f => f.altitude).length;

        const averageSpeed =
            flights
                .filter(f => f.velocity)
                .reduce((sum, f) => sum + f.velocity, 0) /
            flights.filter(f => f.velocity).length;

        // Only 10 flights with important fields
        const sampleFlights = flights.slice(0, 10).map(flight => ({
            callsign: flight.callsign || "N/A",
            country: flight.originCountry,
            altitude: flight.altitude,
            speed: flight.velocity,
            latitude: flight.latitude,
            longitude: flight.longitude,
            onGround: flight.onGround
        }));

        console.log("Total Flights:", totalFlights);
        console.log("Flights Sent To AI:", sampleFlights.length);

        const prompt = `
You are an Aviation Operations Intelligence Assistant.

Current Flight Statistics

Total Flights: ${totalFlights}

Flights In Air: ${flightsInAir}

Flights On Ground: ${flightsOnGround}

Average Altitude: ${averageAltitude.toFixed(2)} meters

Average Speed: ${averageSpeed.toFixed(2)} m/s

Sample Flight Data

${JSON.stringify(sampleFlights, null, 2)}

User Question:

${question}

Answer in simple English.
`;

        const answer = await askGemini(prompt);

        res.json({
            success: true,
            answer
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    chatWithAI
};