import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/table.css";

function FlightTable() {

    const [flights, setFlights] = useState([]);

    useEffect(() => {

        const fetchFlights = async () => {

            try {

                const response = await api.get("/flights/latest");

                setFlights(response.data.data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchFlights();

    }, []);

    return (

        <div className="flight-table-container">

            <h2>Latest Flights</h2>

            <table className="flight-table">

                <thead>

                    <tr>

                        <th>Callsign</th>
                        <th>Country</th>
                        <th>Altitude</th>
                        <th>Speed</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {flights.slice(0,15).map((flight,index)=>(

                        <tr key={index}>

                            <td>{flight.callsign || "N/A"}</td>

                            <td>{flight.originCountry}</td>

                            <td>{flight.altitude?.toFixed(0)} m</td>

                            <td>{flight.velocity?.toFixed(1)} m/s</td>

                            <td>

                                {flight.onGround
                                ? "🛬 On Ground"
                                : "✈ In Air"}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default FlightTable;