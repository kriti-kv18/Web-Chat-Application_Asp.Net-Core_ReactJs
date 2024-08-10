import { useEffect, useRef } from "react";
import '../App.css';

const MessageContainer = ({ messages, currentUser }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div ref={messageRef} className="message-container">
            {messages.map((m, index) =>
                <div key={index} className={`user-message ${m.user === currentUser ? 'right' : 'left'}`}>
                    <div className="message">{m.message}</div>
                    <div className="from-user">{m.user}</div>
                </div>
            )}
        </div>
    );
}

export default MessageContainer;
