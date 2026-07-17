import { useState } from "react";
import api from "../services/api";
import "../styles/chatbot.css";

function Chatbot() {

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        if (!question.trim()) return;

        try {

            setLoading(true);

            const response = await api.post("/ai/chat", {
                question
            });

            setAnswer(response.data.answer);

        }catch (error) {

                console.error(error);

                console.log(error.response);

                setAnswer(
                    error.response?.data?.message ||
                    error.message
                );

            }

            setLoading(false);

        };

        return (

            <div className="chat-container">

                <h2>🤖 AI Flight Assistant</h2>

                <textarea

                    rows="4"

                    placeholder="Ask anything about the current flight data..."

                    value={question}

                    onChange={(e) => setQuestion(e.target.value)}

                />

                <button onClick={askAI}>

                    Ask AI

                </button>

                {

                    loading &&

                    <p>Thinking...</p>

                }

                {

                    answer &&

                    <div className="answer-box">

                        <h4>AI Response</h4>

                        <p>{answer}</p>

                    </div>

                }

            </div>

        );

    }

    export default Chatbot;