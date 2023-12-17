import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

function Home() {
	const sessionID = sessionStorage.getItem('sessionID');
	const user = JSON.parse(sessionStorage.getItem('user'));
	const navigate = useNavigate();

	return (
		<div>
			<h1>Home Page</h1>
			<button onClick={() => navigate("/movies")}>Movies</button>
			<button onClick={() => navigate("/tvShows")}>TV Shows</button>
			{sessionID ? (
				<div>
					<h2>Welcome, {user.username}!</h2>
				</div>
			) : (
				<div>
					<h2>Teste, nao esta ninguem logado</h2>
					<button onClick={() => navigate("/login")}>Login</button>
					<button onClick={() => navigate("/register")}>Register</button>
				</div>
			)}
		</div>
	);
}

export default Home;