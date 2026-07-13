import "../styles/navbar.css";

function Navbar() {
    const today = new Date();

    return (
        <nav className="navbar-custom">

            <div className="navbar-left">
                <h2>✈ Aviation Operations Intelligence System</h2>
                <p>Real-Time Flight Monitoring Dashboard</p>
            </div>

            <div className="navbar-right">

                <div className="live-status">
                    🟢 Live Data
                </div>

                <div className="current-date">
                    {today.toLocaleDateString()}
                </div>

            </div>

        </nav>
    );
}

export default Navbar;