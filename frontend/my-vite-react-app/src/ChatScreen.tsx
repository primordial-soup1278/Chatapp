import { useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuth } from "./useAuth";
import "./style/ChatScreen.css";

const ChatScreen = () => {
    const messageRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const stompClientRef = useRef<Client | null>(null);
    const location = useLocation();
    const {friend} = location.state || {};
    const {user} = useAuth();
    const [messages, setMessages] = useState<Array<any>>([]);

    const fetchChatHistory = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_USER_URL.replace("/users","/messaging/api")}/between/${user.id}/${friend.id}`,
        );
        const history = await res.json();
        setMessages(history);
    }


    useEffect(() => {
        fetchChatHistory();
        console.log("messages: ",messages);
    },[messages]);

    useEffect(() => {
        const socket = new SockJS(import.meta.env.VITE_USER_URL.replace("/users", "/ws"));
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("connected to websocket");
                
                stompClient.subscribe("user/queue/messages", (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log("Received message: ", receivedMessage);

                    setMessages(prev => [...prev, receivedMessage]);
                });
            }
        });
        stompClient.activate();
        stompClientRef.current = stompClient;
        return () => {
            stompClient.deactivate();
        }
        
    },[])
    const handleSendMessage = () => {
        const message = messageRef.current?.value;
        if (message && stompClientRef.current && friend) {
            stompClientRef.current.publish({
                destination: "/app/chat.private",
                body: JSON.stringify({
                    content: message,
                    sender: {username : user?.username},
                    recipient: {username: friend.username} ,
                    timestamp: new Date().toISOString(),

                }),
            });

            console.log("Sending message: ", message);
            // clearing the input field after sending message
            messageRef.current.value = "";
        }
    }
    return <div className="chatScreen-container">
        <button className="back-button" onClick={() => navigate(-1)}>
            &larr; Back
        </button>
        <h1>Chatting with {friend ? friend.username : "Unknown User"}</h1>

        {/* chat between user's is displayed here */}
        <div className = "messages-container">
            {messages.map((msg, index) => (
                <div className = "message-item" key={index}>
                    <p>
                        <strong>{msg.sender.username}</strong>: {msg.content}
                    </p>
                </div>
            ))}
            {messages.length === 0 && (
                <p>No messages yet! Start the conversation</p>
            )}
        </div>

        <div className="input-container">
            <div className="input-wrapper">
                <input
                className="message-input" 
                placeholder="Enter messages here"
                ref={messageRef}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                    }
                }}/>
                <button className="send-button"
                onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    </div>
}

export default ChatScreen;