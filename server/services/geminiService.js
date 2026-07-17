const axios = require("axios");

const askGemini = async (prompt) => {

    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/auto",

                messages: [
                    {
                        role: "system",
                        content: "You are an Aviation Operations Intelligence Assistant."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "Aviation Operations Intelligence System"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {

        console.log("STATUS:", error.response?.status);

        console.log(
            JSON.stringify(error.response?.data, null, 2)
        );

        throw error;

    }

};

module.exports = askGemini;