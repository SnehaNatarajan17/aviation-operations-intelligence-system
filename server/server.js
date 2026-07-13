const flightRoutes = require("./routes/flightRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const startFlightScheduler = require("./cron/fetchFlights");

dotenv.config();

// Connect to MongoDB
connectDB();

startFlightScheduler();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/flights", flightRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI-Powered Aviation Operations Intelligence System API is running successfully 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});