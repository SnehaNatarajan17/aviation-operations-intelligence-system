import { useEffect, useState } from "react";
import api from "../services/api";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import L from "leaflet";

import "../styles/map.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FlightMap() {

    const [flights, setFlights] = useState([]);

    useEffect(() => {

        const fetchFlights = async () => {

            try {

                const response = await api.get("/flights/latest");

                setFlights(response.data.data);

            }

            catch(error){

                console.log(error);

            }

        };

        fetchFlights();

    }, []);

    return (

        <div className="map-container">

            <h2>Live Flight Map</h2>

            <MapContainer
                center={[22.5,79]}
                zoom={5}
                style={{
                    height:"500px",
                    width:"100%"
                }}
            >

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {

                    flights.map((flight,index)=>{

                        if(!flight.latitude || !flight.longitude){

                            return null;

                        }

                        return(

                            <Marker

                                key={index}

                                position={[
                                    flight.latitude,
                                    flight.longitude
                                ]}

                            >

                                <Popup>

                                    <strong>

                                        {flight.callsign}

                                    </strong>

                                    <br/>

                                    {flight.originCountry}

                                    <br/>

                                    Altitude:
                                    {" "}
                                    {flight.altitude} m

                                    <br/>

                                    Speed:
                                    {" "}
                                    {flight.velocity} m/s

                                </Popup>

                            </Marker>

                        );

                    })

                }

            </MapContainer>

        </div>

    );

}

export default FlightMap;