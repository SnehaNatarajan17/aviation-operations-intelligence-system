import { useEffect, useState } from "react";
import api from "../services/api";

import {
    FaPlane,
    FaPlaneDeparture,
    FaPlaneArrival,
    FaGlobeAsia,
    FaMountain,
    FaTachometerAlt
} from "react-icons/fa";

import "../styles/statistics.css";

function StatisticsCards() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        const fetchStatistics = async () => {

            try{

                const response = await api.get("/flights/statistics");

                setStats(response.data.statistics);

            }
            catch(error){

                console.log(error);

            }

        };

        fetchStatistics();

    },[]);

    if(!stats){

        return <h3>Loading...</h3>

    }

    return(

        <>

        <h2 className="dashboard-heading">

            Dashboard Overview

        </h2>

        <div className="stats-grid">

            <div className="stat-card blue">

                <FaPlane className="icon"/>

                <h5>Total Flights</h5>

                <h2>{stats.totalFlights}</h2>

                <p>Active Aircraft</p>

            </div>

            <div className="stat-card green">

                <FaPlaneDeparture className="icon"/>

                <h5>Flights In Air</h5>

                <h2>{stats.flightsInAir}</h2>

                <p>Currently Flying</p>

            </div>

            <div className="stat-card orange">

                <FaPlaneArrival className="icon"/>

                <h5>On Ground</h5>

                <h2>{stats.flightsOnGround}</h2>

                <p>Airport Operations</p>

            </div>

            <div className="stat-card purple">

                <FaGlobeAsia className="icon"/>

                <h5>Countries</h5>

                <h2>{stats.totalCountries}</h2>

                <p>Coverage</p>

            </div>

            <div className="stat-card red">

                <FaMountain className="icon"/>

                <h5>Avg Altitude</h5>

                <h2>{stats.averageAltitude}</h2>

                <p>meters</p>

            </div>

            <div className="stat-card cyan">

                <FaTachometerAlt className="icon"/>

                <h5>Avg Speed</h5>

                <h2>{stats.averageSpeed}</h2>

                <p>m/s</p>

            </div>

        </div>

        </>

    );

}

export default StatisticsCards;