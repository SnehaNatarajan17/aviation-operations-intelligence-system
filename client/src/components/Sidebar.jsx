import "../styles/sidebar.css";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="logo">

                ✈

                <h3>AOIS</h3>

            </div>

            <ul>

                <li>📊 Dashboard</li>

                <li>🛫 Flight Statistics</li>

                <li>🗺 Live Flight Map</li>

                <li>🔍 Search Flight</li>

                <li>📋 Flight Table</li>

                <li>🤖 AI Assistant</li>

            </ul>

        </aside>

    );

}

export default Sidebar;