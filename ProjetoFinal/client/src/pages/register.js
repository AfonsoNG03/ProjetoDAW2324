import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import '../css/style_login_register.css';

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

        // Create a user object with the input data
        const user = {
            username: name,
            password: password
        }

        try {
            //Faz um POST request para endpoint de registo
            const response = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            //Verifica se o registo foi bem sucedido
            if (response.ok) {
                //Faz o parse dos dados do response
                const data = await response.json();
                console.log('Registation successful:', data);
                navigate("/message/1");
            } else {
                //Se o resgisto falhar
                console.error('Registation failed');
            }
        } catch (error) {
            //Lanca um erro se uma excecao ocorre durante o registo
            console.error('Error during Registation:', error.message);
        }
    }

    return (
        <div>
            <Header />
            <div className="login-box">
            <div className="button-container">
                    <h1>Register</h1>
                    <div>
                        <button onClick={() => navigate("/")}>Home</button>
                        <button onClick={() => navigate("/login")}>Login</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <label htmlFor="username">username</label>
                        <input className="form-control" type="username" name="username"
                            id="username" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>

                    <div className="user-box">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" name="password"
                            id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="user-box">
                        <label htmlFor="password">Password Confirmation</label>
                        <input className="form-control" type="password" name="confirmPassword"
                            id="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                    </div>

                    <button><span></span>
                        <span></span>
                        <span></span>
                        <span></span>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Register