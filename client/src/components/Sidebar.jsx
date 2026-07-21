import "../styles/sidebar.css";

function Sidebar() {

    const scrollToSection = (id) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    return (

        <aside className="sidebar">

            <div className="logo">
                ✈
                <h3>AOIS</h3>
            </div>

            <ul>

                <li onClick={() => scrollToSection("dashboard")}>
                    🛫 Flight Statistics
                </li>

                <li onClick={() => scrollToSection("map")}>
                    🗺 Live Flight Map
                </li>

                <li onClick={() => scrollToSection("search")}>
                    🔍 Search Flight
                </li>

                <li onClick={() => scrollToSection("flights")}>
                    📋 Flight Table
                </li>

                <li onClick={() => scrollToSection("analytics")}>
                    📈 Flight Analytics
                </li>

                <li onClick={() => scrollToSection("chatbot")}>
                    🤖 AI Assistant
                </li>

            </ul>

        </aside>

    );

}

export default Sidebar;