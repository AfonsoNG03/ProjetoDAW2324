import { useNavigate } from "react-router-dom";
import "../css/home.css";
import Header from "../components/Header"

const API_BASE = "http://localhost:8080";

function Home() {
	const sessionID = sessionStorage.getItem('sessionID');
	const user = JSON.parse(sessionStorage.getItem('user'));
	const navigate = useNavigate();

	return (
		<div class="home">
			<div className="overlay"></div>
			<Header />
			<div className="content">
				
				<div className="welcome-text">
					<h1>Welcome to the Movie Database!</h1>
					<p>Here you can find information about movies and TV shows, and select your favorites</p>
				</div>
				<button onClick={() => navigate("/movies")}>Movies</button>
				<button onClick={() => navigate("/tvShows")}>TV Shows</button>
				{sessionID ? (
					<div>
						<h2>Welcome, {user.username}!</h2>
						<button onClick={() => navigate("/profile")}>Profile</button>
						<button onClick={() => navigate("/message/3")}>Logout</button>
					</div>
				) : (
					<div>
						<h2>Teste, não está ninguém logado</h2>
						<button onClick={() => navigate("/login")}>Login</button>
						<button onClick={() => navigate("/register")}>Register</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;