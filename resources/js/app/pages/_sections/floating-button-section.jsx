import React, { useState, useEffect, useRef } from "react";
import { X, Bot, Send } from "lucide-react";
import store from "@/app/store/store";
import { cocd_prompt_thunk } from "@/app/redux/app-thunk";
import { useSelector } from "react-redux";
import moment from "moment";
import { FaCheck } from "react-icons/fa6";
import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const types = ["Incident Report", "Ask a Question"];
export default function ChatbotModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { chatbots } = useSelector((store) => store.app);
    const scrollRef = useRef(null);
    const [animateIn, setAnimateIn] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [files, setFiles] = useState([]);
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
            setSelectedOption("");
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

    const sendMessage = async () => {
        if (input.trim() === "") return;
        try {
            const formData = new FormData();
            files.forEach((fileObj) => {
                formData.append("files[]", fileObj.originFileObj);
            });
            formData.append("prompt", input);
            formData.append("type", selectedOption);

            setIsAnalyzing(true);
            setMessages([...messages, { from: "user", text: input }]);
            setInput("");
            const res = await store.dispatch(cocd_prompt_thunk(formData));
            setMessages((prev) => [...prev, { from: "bot", text: res.result }]);
            setSelectedOption("");
            setIsAnalyzing(false);
        } catch (error) {
            setInput("");
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: error.message },
            ]);
            setSelectedOption("");
            setIsAnalyzing(false);
        }
        // setMessages([...messages, { from: "user", text: input }]);
        // setInput("");

        // setMessages((prev) => [
        //     ...prev,
        //     { from: "bot", text: "Thanks for your message!" },
        // ]);
    };

    const handleQuickNoteSelect = (option) => {
        if (option == "Incident Report") {
            setInput(
                `Name of Violator:\nDate and Time: ${moment().format(
                    "LLL"
                )}\nWitnesses (if any):\nDetails of Incident:\nAdditional Notes:`
            );
        } else {
            setInput("");
        }
        setSelectedOption(option);
    };

    const props = {
        name: "file",
        multiple: true,
        method: "GET",
        action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                setFiles(info.fileList);
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
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
                            <br />
                            {selectedOption == "Incident Report" && (
                                <Dragger
                                    className="!h-36 !p-0 flex items-center justify-center border-dashed border-2 border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                                    {...props}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to this area to
                                        upload the evidence.
                                    </p>
                                </Dragger>
                            )}
                            <br />
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
                        <div className="flex flex-wrap gap-2 m-3">
                            {types.map((note, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() =>
                                        handleQuickNoteSelect(
                                            note == selectedOption ? "" : note
                                        )
                                    }
                                    className={`border-2 text-blue-800 font-black rounded-full border-blue-800 px-3 py-1.5 text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        note === selectedOption
                                            ? "bg-blue-800 text-white  ring-blue-800"
                                            : ""
                                    }`}
                                >
                                    <div className="flex gap-1">
                                        {note == selectedOption && (
                                            <FaCheck className="h-5" />
                                        )}{" "}
                                        {note}
                                    </div>
                                </button>
                            ))}
                        </div>
                        {(selectedOption === "Ask a Question" ||
                            (selectedOption === "Incident Report" &&
                                files.length !== 0)) && (
                            <div className="flex items-center gap-2 border-t p-4 bg-white sticky bottom-0 z-10">
                                <textarea
                                    rows={3}
                                    disabled={isAnalyzing}
                                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage();
                                        }
                                    }}
                                />

                                <button
                                    disabled={isAnalyzing}
                                    onClick={sendMessage}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
