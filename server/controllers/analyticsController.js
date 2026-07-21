const Flight = require("../models/Flight");

const getAnalytics = async (req, res) => {

    try {

        const analytics = await Flight.aggregate([

            {
                $group: {

                    _id: "$snapshotId",

                    timestamp: {
                        $first: "$timestamp"
                    },

                    totalFlights: {
                        $sum: 1
                    },

                    avgAltitude: {
                        $avg: "$altitude"
                    },

                    avgSpeed: {
                        $avg: "$velocity"
                    }

                }
            },

            {
                $sort: {
                    timestamp: 1
                }
            },

            {
                $limit: 20
            }

        ]);

        res.json({
            success: true,
            analytics
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Analytics Error"
        });

    }

};

module.exports = {
    getAnalytics
};