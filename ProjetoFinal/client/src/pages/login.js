import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import '../css/style_login_register.css';

const API_BASE = "http://localhost:8080";

function Login() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a user object with the input data
        const user = {
            username: name,
            password: password
        }

        try {
             //Fast um POST request para endpoint de login
            const response = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            //Verifica se o login foi bem sucedido
            if (response.ok) {
                //Faz parse dos dados do response
                const data = await response.json();
                console.log('Login successful:', data);
                //Extrai a informacao do token e do user do response
                const token = data.token;
                const user = data.user;
                //Armazena a informacao do token e do user no session storage
                sessionStorage.setItem('sessionID', token);
                sessionStorage.setItem('user', JSON.stringify(user));

                navigate("/message/2");
            } else {
                 //Se o login falhar
                console.error('Login failed');
            }
        } catch (error) {
            //Lanca um erro se uma excecao ocorre durante o registo
            console.error('Error during login:', error.message);
        }
    }

    return (
        <div>
            <Header />


            <div className="login-box">

                <div className="button-container">
                    <h1>Login</h1>
                    <div>
                        <button onClick={() => navigate("/")}>Home</button>
                        <button onClick={() => navigate("/register")}>Register</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <label htmlFor="username">username</label>
                        <input type="username" name="username"
                            id="username" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>

                    <div className="user-box">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"
                            id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
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

export default Login