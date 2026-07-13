import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatisticsCards from "../components/StatisticsCards";
import FlightMap from "../components/FlightMap";
import FlightTable from "../components/FlightTable";
import SearchFlight from "../components/SearchFlight";
import Chatbot from "../components/Chatbot";

import "../styles/dashboard.css";

function Dashboard(){

    return(

        <>

            <Navbar />

<div className="dashboard">

    <Sidebar />

    <div className="dashboard-content">

        <StatisticsCards />

        <FlightTable />

        <FlightMap />

        <SearchFlight />

        <Chatbot />

    </div>

</div>

        </>

    )

}

export default Dashboard;