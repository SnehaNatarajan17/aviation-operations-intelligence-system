const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
    {
        icao24: {
            type: String,
            required: true,
            index: true,
        },

        callsign: {
            type: String,
            trim: true,
            default: "",
            index: true,
        },

        originCountry: {
            type: String,
            required: true,
            index: true,
        },

        latitude: {
            type: Number,
            default: null,
        },

        longitude: {
            type: Number,
            default: null,
        },

        altitude: {
            type: Number,
            default: null,
        },

        velocity: {
            type: Number,
            default: null,
        },

        heading: {
            type: Number,
            default: null,
        },

        verticalRate: {
            type: Number,
            default: null,
        },

        onGround: {
            type: Boolean,
            default: false,
        },

        lastContact: {
            type: Number,
        },

        timePosition: {
            type: Number,
        },

        source: {
            type: String,
            default: "OpenSky",
        },

        snapshotId: {
            type: String,
            required: true,
            index: true,
        },

        timestamp: {
            type: Date,
            default: Date.now,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Flight", flightSchema);