import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            console.error('Password and Confirm Password do not match');
            return;
        }

        const user = {
            username: name,
            password: password
        }

        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Registation successful:', data);
                navigate("/message/1");
            } else {
                console.error('Registation failed');
            }
        } catch (error) {
            console.error('Error during Registation:', error.message);
        }
    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input className="form-control" type="username" name="username"
                        id="username" value={name} onChange={(event) => setName(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password"
                        id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password Confirmation</label>
                    <input className="form-control" type="password" name="confirmPassword"
                        id="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                </div>

                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default Register