import { useState } from "react";
import api from "../services/api";
import "../styles/search.css";

function SearchFlight() {

    const [callsign, setCallsign] = useState("");

    const [flight, setFlight] = useState(null);

    const [message, setMessage] = useState("");

    const searchFlight = async () => {

        if (!callsign.trim()) {

            setMessage("Please enter a callsign.");

            setFlight(null);

            return;

        }

        try {

            const response = await api.get(
                `/flights/search?callsign=${callsign}`
            );

            setFlight(response.data.flight);

            setMessage("");

        }

        catch (error) {

            setFlight(null);

            setMessage("Flight not found.");

        }

    };

    return (

        <div className="search-container">

            <h2>Search Flight</h2>

            <div className="search-box">

                <input

                    type="text"

                    placeholder="Enter Callsign (Example: AIC2388)"

                    value={callsign}

                    onChange={(e)=>setCallsign(e.target.value)}

                />

                <button onClick={searchFlight}>

                    Search

                </button>

            </div>

            {message &&

                <p className="error-message">

                    {message}

                </p>

            }

            {flight && (

                <div className="flight-card">

                    <h3>{flight.callsign}</h3>

                    <p><strong>Country:</strong> {flight.originCountry}</p>

                    <p><strong>Altitude:</strong> {flight.altitude} m</p>

                    <p><strong>Speed:</strong> {flight.velocity} m/s</p>

                    <p><strong>Heading:</strong> {flight.heading}°</p>

                    <p><strong>Latitude:</strong> {flight.latitude}</p>

                    <p><strong>Longitude:</strong> {flight.longitude}</p>

                    <p>

                        <strong>Status:</strong>

                        {flight.onGround ? " 🛬 On Ground" : " ✈ In Air"}

                    </p>

                </div>

            )}

        </div>

    );

}

export default SearchFlight;