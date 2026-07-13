const axios = require("axios");

// Bounding box for India
const INDIA_BBOX = {
    lamin: 6.5,
    lomin: 68.0,
    lamax: 37.5,
    lomax: 97.5,
};

const fetchFlightsFromOpenSky = async () => {
    try {
        const url = `https://opensky-network.org/api/states/all?lamin=${INDIA_BBOX.lamin}&lomin=${INDIA_BBOX.lomin}&lamax=${INDIA_BBOX.lamax}&lomax=${INDIA_BBOX.lomax}`;

        const response = await axios.get(url, {
            timeout: 15000,
        });

        const states = response.data.states || [];

        const snapshotId = Date.now().toString();

        const flights = states.map((flight) => ({
            icao24: flight[0],
            callsign: flight[1] ? flight[1].trim() : "",
            originCountry: flight[2],
            timePosition: flight[3],
            lastContact: flight[4],
            longitude: flight[5],
            latitude: flight[6],
            altitude: flight[7],
            onGround: flight[8],
            velocity: flight[9],
            heading: flight[10],
            verticalRate: flight[11],
            source: "OpenSky",
            snapshotId: snapshotId,
            timestamp: new Date(),
        }));

        return flights;
    } catch (error) {
        console.error("❌ Error fetching OpenSky data:", error.message);
        return [];
    }
};

module.exports = fetchFlightsFromOpenSky;