import { useEffect, useState } from "react";
import api from "../services/api";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function AnalyticsChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics = async () => {

        try {

            const response = await api.get("/analytics");
            console.log(response.data);
            const formatted = response.data.analytics.map((item) => ({
                
                time: new Date(item.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                }),

                flights: item.totalFlights,

                altitude: Number(item.avgAltitude?.toFixed(0)) || 0,

                speed: Number(item.avgSpeed?.toFixed(0)) || 0

            }));
            console.log(formatted);
            setData(formatted);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div
            style={{
                background: "#fff",
                marginTop: "25px",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
        >

            <h2>Flight Analytics</h2>

            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="time" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="flights"
                        stroke="#1976d2"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="altitude"
                        stroke="#43a047"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="speed"
                        stroke="#ef6c00"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default AnalyticsChart;