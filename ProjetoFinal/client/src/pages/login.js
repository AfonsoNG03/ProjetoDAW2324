import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

function Login() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            username: name,
            password: password
        }

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                const token = data.token;
                const user = data.user;
                sessionStorage.setItem('sessionID', token);
                sessionStorage.setItem('user', JSON.stringify(user));

                navigate("/message/2");
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input className="form-control" type="username" name="username" 
                        id="username" value={name} onChange={(event) => setName(event.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" 
                    id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>

                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login