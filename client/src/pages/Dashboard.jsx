import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatisticsCards from "../components/StatisticsCards";
import FlightMap from "../components/FlightMap";
import FlightTable from "../components/FlightTable";
import SearchFlight from "../components/SearchFlight";
import Chatbot from "../components/Chatbot";
import AnalyticsChart from "../components/AnalyticsChart";

import "../styles/dashboard.css";

function Dashboard() {

    return (

        <>

            <Navbar />

            <div className="dashboard">

                <Sidebar />

                <div className="dashboard-content">

                    <div id="dashboard">
                        <StatisticsCards />
                    </div>

                    <div id="flights">
                        <FlightTable />
                    </div>

                    <div id="search">
                        <SearchFlight />
                    </div>

                    <div id="map">
                        <FlightMap />
                    </div>

                    <div id="analytics">
                        <AnalyticsChart />
                    </div>

                    <div id="chatbot">
                        <Chatbot />
                    </div>

                </div>

            </div>

        </>

    )

}

export default Dashboard;