import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/message.css";

function Message() {
    const navigate = useNavigate();
    const { id } = useParams();
    const idNumber = parseInt(id);
    const [typedMessage, setTypedMessage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const getMessage = () => {
        if (idNumber === 1)
            return "Você se registrou com sucesso!";
        else if (idNumber === 2)
            return "Você fez login com sucesso!";
        else if (idNumber === 3) {
            logout();
            return "Você fez logout com sucesso!";
        }
    };

    const logout = () => {
        sessionStorage.removeItem("sessionID");
        sessionStorage.removeItem("user");
        return;
    };

    useEffect(() => {
        const message = getMessage();
        const typingTimer = setInterval(() => {
            if (currentIndex < message.length) {
                setTypedMessage((prevTypedMessage) => prevTypedMessage + message[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }
        }, 50); // Reduced interval for faster typing

        // Redirect to the home page after 2 seconds
        setTimeout(() => {
            clearInterval(typingTimer);
            navigate("/");
        }, 2000);

        // Cleanup interval on component unmount
        return () => clearInterval(typingTimer);
    }, [idNumber, navigate, currentIndex]);

    return <div className="container center">{typedMessage}</div>;
}

export default Message;
