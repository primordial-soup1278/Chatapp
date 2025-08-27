import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style/ChatScreen.css";
const ChatScreen = () => {
    const messageRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const location = useLocation();
    const {friend} = location.state || {};

    const handleSendMessage = () => {
        const message = messageRef.current?.value;
        if (message) {
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


        <div className="input-container">
            <div className="input-wrapper">
                <input
                className="message-input" 
                placeholder="Enter messages here"
                ref={messageRef}
                onKeyDown={e =>{
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