import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Message() {
    const navigate = useNavigate();
    const { id } = useParams()
    
    const idNumber = parseInt(id);

    const getMessage = () => {
        if (idNumber === 1)
            return "You have successfully registered! You can now log in.";
        else if (idNumber === 2)
            return "You have successfully logged in!";
        else if (idNumber === 3){
            logout();
            return "You have successfully logged out!";
        }
    }

    const logout = () => {
        sessionStorage.removeItem('sessionID');
        sessionStorage.removeItem('user');
        return;
    }

    useEffect(() => {
        let timeleft = 2;
        const downloadTimer = setInterval(() => {
          if (timeleft <= 0) {
            clearInterval(downloadTimer);
            navigate("/");
          }
          timeleft -= 1;
        }, 1000);
      }, []);

    return (
        <div>
            <h1>{getMessage()}</h1>
        </div>
    );
}

export default Message;