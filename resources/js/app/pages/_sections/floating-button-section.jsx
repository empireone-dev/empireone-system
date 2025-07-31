import React, { useState, useEffect, useRef } from "react";
import { X, Bot, Send } from "lucide-react";
import store from "@/app/store/store";
import { cocd_prompt_thunk } from "@/app/redux/app-thunk";
import { useSelector } from "react-redux";

export default function ChatbotModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { chatbots } = useSelector((store) => store.app);
    const scrollRef = useRef(null);
    const [animateIn, setAnimateIn] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Hello! How can I assist you today regarding the Code of Conduct and Discipline document?",
        },
    ]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages.length, isOpen]);

    const toggleModal = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setAnimateIn(true), 10); // small delay for animation to trigger
        } else {
            setMessages([
                { from: "bot", text: "Hello! How can I assist you today?" },
            ]);
            setAnimateIn(false);
            setTimeout(() => setIsOpen(false), 300); // wait for animation to finish
        }
    };

    console.log("chatbots", chatbots.result);

    useEffect(() => {
        if (chatbots.result) {
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: chatbots.result },
            ]);
        }
    }, [chatbots.result]);

    const sendMessage = async () => {
        if (input.trim() === "") return;
        try {
            setIsAnalyzing(true);
            setMessages([...messages, { from: "user", text: input }]);
            setInput("");
            await store.dispatch(cocd_prompt_thunk({ prompt: input }));
            setIsAnalyzing(false);
        } catch (error) {
            setInput("");
            setIsAnalyzing(false);
        }
        // setMessages([...messages, { from: "user", text: input }]);
        // setInput("");

        // setMessages((prev) => [
        //     ...prev,
        //     { from: "bot", text: "Thanks for your message!" },
        // ]);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button onClick={toggleModal} className="fixed bottom-6 right-4">
                <img src="/gif/chatbot.gif" className="h-24" />
            </button>

            {/* Modal with Transition */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity">
                    <div
                        className={`bg-white h-screen w-screen max-w-none rounded-none 
    md:h-[500px] md:w-[500px] md:max-w-md md:rounded-2xl
    shadow-lg flex flex-col  justify-between overflow-hidden transform transition-all duration-300
    ${
        animateIn
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
    }
  `}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
                            <h2 className="text-lg text-white flex gap-2 font-semibold">
                                <Bot className="w-7 h-7" /> Chatbot Assistant
                            </h2>
                            <button onClick={toggleModal}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-4 space-y-2 overflow-y-auto max-h-[600px]"
                        >
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${
                                        msg.from === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                                            msg.from === "user"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: msg.text,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {isAnalyzing && (
                                <div className="flex items-center px-3 py-2 justify-center bg-gray-200 rounded-2xl max-w-14">
                                    <div className="flex space-x-1">
                                        <div
                                            className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                                            style={{ animationDelay: "0s" }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.4s" }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="flex items-center gap-2 border-t p-4 bg-white sticky bottom-0 z-10">
                            <input
                                type="text"
                                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && sendMessage()
                                }
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
